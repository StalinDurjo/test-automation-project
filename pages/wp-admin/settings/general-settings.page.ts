import BasePage from "@pages/common/base.page";
import { Page } from "@playwright/test";

export default class GeneralSettingsPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/wp-admin/options-general.php";
  }

  membershipCheckbox() {
    return this.page.getByRole("checkbox").and(this.page.locator("#users_can_register"));
  }

  async enterAddressLine1(address1: string) {
    await this.page.locator("#woocommerce_store_address").fill(address1);
  }

  async enterCity(city: string) {
    await this.page.locator("#woocommerce_store_city").fill(city);
  }
}
