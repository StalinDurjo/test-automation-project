import { Page } from "@playwright/test";

export default class BasePage {
  protected page: Page;
  protected url: string;
  protected baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.url = "/";
  }

  //   setBaseUrl(baseUrl: string) {
  //     this.baseUrl = baseUrl;
  //     // this.url = this.baseUrl + this.url;
  //   }

  //   async goto(url: string = "") {
  //     if (url) {
  //       await this.page.goto(url);
  //     } else {
  //       await this.page.goto(this.url);
  //     }
  //   }

  async goto() {
    // console.log(this.baseUrl);
    await this.page.goto(this.url);
  }
}
