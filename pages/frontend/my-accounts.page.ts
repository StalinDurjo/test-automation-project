import BasePage from "@pages/common/base.page";
import { Page } from "@playwright/test";

export default class MyAccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = "/my-account/";
  }

  async enterRegUsername(username: string) {
    await this.page.locator(`#reg_email`).fill(username);
  }

  async enterRegPassword(password: string) {
    await this.page.locator(`#reg_password`).fill(password);
  }

  async enterLoginUsername(username: string) {
    await this.page.locator("#username").fill(username);
  }

  async enterLoginPassword(password: string) {
    await this.page.locator("#password").fill(password);
  }
}
