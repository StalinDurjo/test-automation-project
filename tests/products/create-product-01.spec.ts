import { expect, test } from "@pages/common/fixtures";
import AddProductsPage, { selectors } from "@pages/wp-admin/products/add-products.page";

test.use({ storageState: process.env.ADMIN_STATE });

let addProductsPage: AddProductsPage;

test.describe("Create Product", async () => {
  test.beforeEach(async ({ page }) => {
    addProductsPage = new AddProductsPage(page);
    await addProductsPage.goto();
    await addProductsPage.enterProductTitle("Test Product 1");
    await addProductsPage.enterRegularPrice("10");
  });

  test("Create Simple Product", async ({ page }) => {
    await addProductsPage.wpPublish().click();

    await page.waitForURL(/\/wp-admin\/post\.php\?post=\d+&action=edit/);
    const url = page.url();
    const postId = url.match(/post=(\d+)/)[1];

    await page.goto("/wp-admin/edit.php?post_type=product");
    await page.locator(`//tr[@id="post-${postId}"]/td[2]/strong/a`).click();

    const title = await page.inputValue(selectors.productTitle);
    const price = await page.inputValue(selectors.regularPrice);

    expect(title).toEqual("Test Product 1");
    expect(price).toEqual("10");
  });

  test("Create Variable Product", async ({ page }) => {
    await addProductsPage.selectProductType("variable");
    await addProductsPage.clickOnTab("Attributes");
    await addProductsPage.setNthAttribute(0, "Color", "Red | Blue");
    await addProductsPage.clickOnTab("Variations");

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await addProductsPage.clickOnGenerateVariations();

    await addProductsPage.expandNthVariation(1);
    await addProductsPage.setNthVariationRegularPrice(1, "100");
    await addProductsPage.expandNthVariation(2);
    await addProductsPage.setNthVariationRegularPrice(2, "200");

    await page.getByRole("button", { name: "Save changes" }).click();
    await addProductsPage.wpPublish().click();

    await page.waitForURL(/\/wp-admin\/post\.php\?post=\d+&action=edit/);
    const url = page.url();
    const postId = url.match(/post=(\d+)/)[1];

    await page.getByRole("link", { name: "All Products" }).click();

    await page.locator(`#post-${postId}`).getByRole("link", { name: "Test Product 1", exact: true }).click();
    await page.locator(`.product_data_tabs`).getByText("Variations").click();
    await page.getByRole("link", { name: "Edit", exact: true }).nth(1).click();
    await expect(page.getByRole("textbox", { name: "Regular price ($)" })).toHaveValue("100");
    await page.getByRole("link", { name: "Edit", exact: true }).nth(2).click();
    await expect(page.locator("#variable_regular_price_1")).toHaveValue("200");
  });
});
