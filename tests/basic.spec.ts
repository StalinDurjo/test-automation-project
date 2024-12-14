import { test } from "@pages/common/fixtures";
import GeneralSettingsPage from "@pages/wp-admin/settings/general-settings.page";
import { woocommerceApi } from "../src/utils/wc-api";
import ApiRequest from "src/lib/api-request";

const { username, password } = process.env;
import { testData } from "./test-data/data";

test.use({ storageState: `${process.cwd()}/.state/admin-state.json` });

test("Set Anyone Can Register", async ({ pageActions }) => {
  // await pageActions.login(username, password);
  // await pageActions.setAnyoneCanRegister(true);
  // await woocommerce.get.products();
  // const request = new ApiRequest();
  // const data = request.get("http://localhost:8889/wp-json/wc/v3/products");
  // console.log(await data);
  // const request = new ApiRequest();
  // const payload = {
  //   value: "yes"
  // };
  // await request.put(`http://localhost:8889/wp-json/wc/v3/settings/tax/woocommerce_prices_include_tax`, { payload });
  // const consumerKey = "ck_06901b3c80680fb146c908a69bb367ccf9686051";
  // const consumerSecret = "cs_b4a83e96f397031fda0f457cb1bd8bad0dca870c";
  // const baseUrl = "http://localhost:8889/wp-json/wc/v3";
  // const request = new ApiRequest();
  // request.setBaseUrl("http://localhost:8889");
  // request.setBasicAuth(consumerKey, consumerSecret);
  // const data = await request.get("/wp-json/wc/v3/products");
  // console.log(data);
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

test.only("Test", async ({ pageActions }) => {
  // const { customer } = testData;
  // const data = await woocommerceApi.create.customer({
  //   email: customer.email,
  //   first_name: customer.first_name,
  //   last_name: customer.last_name,
  //   username: customer.username,
  //   password: customer.password,
  //   billing: { ...customer["us"]["billing"] },
  //   shipping: { ...customer["us"]["shipping"] }
  // });
  // console.log("ass", data.data.email);
});
