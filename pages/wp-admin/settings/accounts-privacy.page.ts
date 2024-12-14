import BasePage from "@pages/common/base.page";
import { Page } from "@playwright/test";

export default class AccountsSettingsPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/wp-admin/admin.php?page=wc-settings&tab=account";
  }

  async clickOnAccountCreationCheckbox() {
    await this.page.locator("#woocommerce_enable_myaccount_registration").click();
  }

  async clickOnSendPasswordSetupLinkCheckbox() {
    await this.page.locator("#woocommerce_registration_generate_password").click();
  }
}
