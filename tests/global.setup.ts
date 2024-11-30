import { test as setup } from "@pages/common/fixtures";

setup("Set Anyone Can Register", async ({ page, baseURL, pageActions }) => {
  // await page.goto(baseURL + "/wp-login.php");
  await pageActions.login("admin", "01sandbox01!");
  // await page.goto(baseURL + "/wp-admin/options-general.php");
  await pageActions.setAnyoneCanRegister(true);
});

setup("Setup Permalink", async ({ page, baseURL, pageActions }) => {
  // await page.goto(baseURL + "/wp-login.php");
  await pageActions.login("admin", "01sandbox01!");
  // await page.goto(baseURL + "/wp-admin/options-permalink.php");
  await pageActions.setPermalinksStructure("Post name");
});
