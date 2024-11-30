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
}
