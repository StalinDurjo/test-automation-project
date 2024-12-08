import WordPressPageActions from "@pages/common/page-actions/wordpress-actions.page";
import AdminLoginPage from "@pages/wp-admin/login.page";
import { chromium, FullConfig } from "@playwright/test";
import fs from "fs";

module.exports = async (config: FullConfig) => {
  const { outputDir } = config.projects[0];
  const { baseURL, storageState } = config.projects[0].use;
  const { username, password } = process.env;

  console.log(`Base URL: ${baseURL}`);

  // used across all playwright projects for authentication
  process.env.ADMIN_STATE = `${storageState}admin-state.json`;
  process.env.CUSTOMER_STATE = `${storageState}customer-state.json`;

  // clear previous save state during setup
  try {
    fs.unlinkSync(process.env.ADMIN_STATE);
    console.log("Admin previous save state file deleted.");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Admin save state file does not exist.");
    } else {
      console.log(`Failed to clear previous admin save states.`);
    }
  }

  try {
    fs.unlinkSync(process.env.CUSTOMER_STATE);
    console.log("Customer previous save state file deleted.");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Customer save state file does not exist.");
    } else {
      console.log(`Failed to clear previous customer save states.`);
    }
  }

  let isAdminLoggedIn = false;
  let isCustomerLoggedIn = false;

  // create browser, browserContext, and page for admin and customer users
  const browser = await chromium.launch({ headless: false });
  const adminContext = await browser.newContext({ baseURL });
  const adminPage = await adminContext.newPage();
  const adminLoginPage = new AdminLoginPage(adminPage);

  const adminRetries = 2;

  for (let i = 0; i < adminRetries; i++) {
    try {
      console.log("Attempting to save admin login state on setup...");
      await adminPage.goto("/wp-login.php");
      await adminLoginPage.enterUsername("admin");
      await adminLoginPage.enterPassword("password");
      await adminLoginPage.clickOnLogin();
      await adminPage.context().storageState({ path: process.env.ADMIN_STATE });
      isAdminLoggedIn = true;
      break;
    } catch (error) {
      console.log(`Saving admin login state failed. Attempt: ${i + 1}/${adminRetries}`);
      console.log(error);

      await adminPage.screenshot({ fullPage: true, path: `${outputDir}/e2e-auth-failed/${i}.png` });
    }
  }

  if (!isAdminLoggedIn) {
    console.log(`Cannot proceed with test. Admin user login failed!`);
    process.exit(1);
  }

  const pageActions = new WordPressPageActions(adminPage);
  // set anyone can register to true
  await pageActions.setAnyoneCanRegister(true);
  // set permalink structure to post name
  await pageActions.setPermalinksStructure("Post name");

  // TODO:: disable send password link

  // console.log(process.env.ADMIN_STATE);
};
