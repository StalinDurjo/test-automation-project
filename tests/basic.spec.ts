import { test } from "@pages/common/fixtures";
import GeneralSettingsPage from "@pages/wp-admin/settings/general-settings.page";

const { username, password } = process.env;

test.use({ storageState: `${process.cwd()}/.state/admin-state.json` });

test.only("Set Anyone Can Register", async ({ pageActions }) => {
  // await pageActions.login(username, password);
  await pageActions.setAnyoneCanRegister(true);
});

test("Setup Permalink", async ({ pageActions }) => {
  await pageActions.login(username, password);
  await pageActions.setPermalinksStructure("Post name");
});

test("Setup Store Address", async ({ page, pageActions }) => {
  page.setDefaultTimeout(5000);
  const generalSettings = new GeneralSettingsPage(page);
  // One Apple Park Way, Cupertino, CA 95014, United States

  await pageActions.login(username, password);
  await page.goto("/wp-admin/admin.php?page=wc-settings");
  await generalSettings.enterAddressLine1("One Apple Park Way");
  await generalSettings.enterCity("Cupertino");

  // await page.getByLabel("Country / Region").selectOption("American Samoa");
  // await page.getByRole("combobox").locator("#select2-woocommerce_default_country-zx-container").click();

  await page.locator(`//tr/th[@class="titledesc"]/label[@for="woocommerce_default_country"]/../../td/span`).click();

  // await page.locator("#select2-woocommerce_default_country-zx-results").selectOption("Afghanistan");
  const data = await page.getByRole("listbox").selectOption({ label: "Afghanistan" });
  console.log(data);

  await page.waitForTimeout(4000);
});
