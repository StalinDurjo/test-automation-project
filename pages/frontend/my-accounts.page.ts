import BasePage from "@pages/common/base.page";
import { Page } from "@playwright/test";

export default class MyAccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/wp-login.php";
  }
}
