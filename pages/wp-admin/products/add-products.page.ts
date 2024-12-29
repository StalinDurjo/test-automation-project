import BasePage from "@pages/common/base.page";
import { Page } from "@playwright/test";

export const selectors = {
  productTitle: "#title",
  regularPrice: "#_regular_price"
};

export default class AddProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/wp-admin/post-new.php?post_type=product";
  }

  async enterProductTitle(title: string) {
    await this.page.locator(selectors.productTitle).fill(title);
  }

  async enterRegularPrice(price: string) {
    await this.page.locator(selectors.regularPrice).fill(price);
  }

  async selectProductType(type: string) {
    await this.page.locator("#product-type").selectOption(type);
  }

  async clickOnTab(tabName: string) {
    await this.page.locator(`.product_data_tabs`).getByText(tabName).click();
  }

  async setNthAttribute(n: number, name: string, values: string) {
    await this.page.locator(`input[name="attribute_names[${n}]"]`).fill(name);
    await this.page.locator(`textarea[name="attribute_values[${n}]"]`).fill(values);
    await this.page.keyboard.press("Space");
    await this.page.locator(".toolbar").getByText("Save attributes").click();
  }

  async clickOnGenerateVariations() {
    await this.page.locator(".generate_variations").click();
  }

  async expandNthVariation(n: number) {
    await this.page.getByRole("link", { name: "Edit", exact: true }).nth(n).click();
  }

  async setNthVariationRegularPrice(n: number, price: string) {
    // await this.page.locator(`#variable_regular_price_${n}`).fill(price);
    await this.page.locator(`#variable_regular_price_${n - 1}`).click();
    await this.page.locator(`#variable_regular_price_${n - 1}`).fill(price);
  }

  async getNthVariationRegularPrice(n: number) {
    await this.page.getByRole("link", { name: "Edit", exact: true }).nth(1).click();
    return await this.page.locator(`#variable_regular_price_${n - 1}`).inputValue();
  }
}
