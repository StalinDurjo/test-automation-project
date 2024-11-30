import { test as base } from "@playwright/test";
import WordPressPageActions from "./page-actions/wordpress-actions.page";

export const test = base.extend<{ pageActions: WordPressPageActions }>({
  pageActions: async ({ page, baseURL }, use) => {
    const pageActions = new WordPressPageActions(page);
    await use(pageActions);
  }
});

export { expect } from "@playwright/test";
