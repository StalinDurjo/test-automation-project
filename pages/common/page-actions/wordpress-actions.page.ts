import { Page } from "@playwright/test";
import WpLoginPage from "@pages/wp-admin/login.page";
import BasePage from "../base.page";
import GeneralSettingsPage from "@pages/wp-admin/settings/general-settings.page";

type PermalinkStructure = {
  structure: "Plain" | "Day and name" | "Month and name" | "Numeric" | "Post name" | "Custom Structure";
};

export default class WordPressPageActions extends BasePage {
  private loginPage: WpLoginPage;
  private generalSettingsPage: GeneralSettingsPage;

  constructor(page: Page) {
    super(page);
    this.loginPage = new WpLoginPage(this.page);
    this.generalSettingsPage = new GeneralSettingsPage(this.page);
  }

  async login(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.enterUsername(username);
    await this.loginPage.enterPassword(password);
    await this.loginPage.clickOnLogin();
  }

  async setAnyoneCanRegister(enabled: boolean) {
    await this.page.goto("/wp-admin/options-general.php");

    if (enabled) {
      await this.generalSettingsPage.membershipCheckbox().check();
    } else {
      await this.generalSettingsPage.membershipCheckbox().uncheck();
    }

    await this.page.getByRole("button", { name: "Save Changes" }).click();
  }

  async setPermalinksStructure(structure: PermalinkStructure["structure"], customStructure: string = "") {
    await this.page.goto("/wp-admin/options-permalink.php");

    switch (structure) {
      case "Plain":
        await this.page.locator("#permalink-input-plain").click();
        break;

      case "Day and name":
        await this.page.locator("#permalink-input-day-name").click();
        break;

      case "Month and name":
        await this.page.locator("#permalink-input-month-name").click();
        break;

      case "Numeric":
        await this.page.locator("#permalink-input-numeric").click();
        break;

      case "Post name":
        await this.page.locator("#permalink-input-post-name").click();
        break;

      case "Custom Structure":
        await this.page.locator("#custom_selection").click();
        await this.page.locator("#permalink_structure").clear();
        await this.page.locator("#permalink_structure").fill(customStructure);
        break;
    }

    await this.page.getByRole("button", { name: "Save Changes" }).click();
  }
}
