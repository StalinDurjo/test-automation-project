import { faker } from "@faker-js/faker";
import { expect, test } from "@pages/common/fixtures";
import AddProductsPage from "@pages/wp-admin/products/add-products.page";
import { woocommerceApi } from "src/utils/wc-api";

test.use({ storageState: process.env.ADMIN_STATE });

let productTitle: string;
let addProductsPage: AddProductsPage;
let productId: number;
let attributeId: number;

test.beforeEach(async ({ page }) => {
  productTitle = faker.commerce.productName() + " " + faker.string.ulid();
  addProductsPage = new AddProductsPage(page);

  const attribute = await woocommerceApi.create.attribute({
    name: faker.string.ulid(),
    type: "select",
    order_by: "menu_order",
    has_archives: true
  });
  attributeId = attribute.data.id;

  const product = await woocommerceApi.create.product({
    name: productTitle,
    type: "variable",
    categories: [],
    attributes: [
      {
        id: attributeId,
        position: 0,
        visible: true,
        variation: true,
        options: ["Red", "Blue"]
      }
    ]
  });
  productId = product.data.id;

  const variation1 = await woocommerceApi.create.productVariation({
    product_id: productId,
    attributes: [{ id: attributeId, option: "Red" }]
  });

  const variation2 = await woocommerceApi.create.productVariation({
    product_id: productId,
    attributes: [{ id: attributeId, option: "Blue" }]
  });

  await woocommerceApi.create.updateProductVariation({ product_id: productId, variation_id: variation1.data.id, regular_price: "100" });

  await woocommerceApi.create.updateProductVariation({ product_id: productId, variation_id: variation2.data.id, regular_price: "200" });
});

test("Create duplicate product", async ({ page }) => {
  const copyProductTitle = `${productTitle} (Copy)`;

  await page.goto("/wp-admin/edit.php?post_type=product");

  await page.locator(`//tr[@id="post-${productId}"]/td[2]/strong/a`).hover();
  await page.locator(`#post-${productId}`).getByText("Duplicate", { exact: true }).click();

  const title = await page.locator(`#title`).inputValue();
  const productType = await page.getByRole("option", { selected: true }).inputValue();

  await addProductsPage.clickOnTab("Variations");

  const firstItemInListPrice = await addProductsPage.getNthVariationRegularPrice(1); // blue
  const secondItemInListPrice = await addProductsPage.getNthVariationRegularPrice(2); // red

  expect(title).toBe(copyProductTitle);
  expect(productType).toBe("variable");
  expect(firstItemInListPrice).toBe("200");
  expect(secondItemInListPrice).toBe("100");
});
