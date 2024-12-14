import { Page } from "@playwright/test";

export default class BasePage {
  protected page: Page;
  protected url: string;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.url = "/";
  }

  async goto(url: string = "") {
    if (url) {
      await this.page.goto(url);
    } else {
      await this.page.goto(this.url);
    }
  }

  submit(title: string) {
    return this.page.locator(`//*[@type="submit"]`).and(this.page.getByText(title));
  }
}
