import WordPressPageActions from "@pages/common/page-actions/wordpress-actions.page";
import AdminLoginPage from "@pages/wp-admin/login.page";
import { chromium, FullConfig } from "@playwright/test";
import fs from "fs";
import { testData } from "./test-data/data";
import { woocommerceApi } from "src/utils/wc-api";
import MyAccountsPage from "@pages/frontend/my-accounts.page";

module.exports = async (config: FullConfig) => {
  const { outputDir } = config.projects[0];
  const { baseURL, storageState } = config.projects[0].use;
  const { CUSTOMER_EMAIL, PASSWORD, ADMIN_EMAIL } = process.env;

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
      await adminLoginPage.enterUsername(ADMIN_EMAIL);
      await adminLoginPage.enterPassword("password");
      await adminLoginPage.clickOnLogin();
      await adminPage.context().storageState({ path: process.env.ADMIN_STATE });
      isAdminLoggedIn = true;
      break;
    } catch (error) {
      console.log(`Saving admin login state failed. Attempt: ${i + 1}/${adminRetries}`);
      console.log(error);

      await adminPage.screenshot({ fullPage: true, path: `${outputDir}/e2e-auth-failed/admin-login-${i}.png` });
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

  // create customer
  const { customer } = testData;
  await woocommerceApi.create.customer({
    email: CUSTOMER_EMAIL,
    first_name: customer.first_name,
    last_name: customer.last_name,
    username: customer.username,
    password: PASSWORD,
    billing: { ...customer["us"]["billing"] },
    shipping: { ...customer["us"]["shipping"] }
  });

  const customerRetries = 2;
  const customerContext = await browser.newContext({ baseURL });
  const customerPage = await customerContext.newPage();
  const myAccountsPage = new MyAccountsPage(customerPage);
  for (let i = 0; i < customerRetries; i++) {
    try {
      console.log("Attempting to save customer login state on setup...");
      await myAccountsPage.goto();
      await myAccountsPage.enterLoginUsername(CUSTOMER_EMAIL);
      await myAccountsPage.enterLoginPassword(PASSWORD);
      await customerPage.keyboard.press("Enter");
      await customerPage.context().storageState({ path: process.env.CUSTOMER_STATE });
      isCustomerLoggedIn = true;
      break;
    } catch (error) {
      console.log(`Saving customer login state failed. Attempt: ${i + 1}/${customerRetries}`);
      console.log(error);

      await customerPage.screenshot({ fullPage: true, path: `${outputDir}/e2e-auth-failed/customer-login-${i}.png` });
    }
  }

  if (!isCustomerLoggedIn) {
    console.log(`Cannot proceed with test. Customer user login failed!`);
    process.exit(1);
  }
};
