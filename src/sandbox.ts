// import axios from "axios";

import ApiRequest from "./lib/api-request";

(async () => {
  // WooCommerce API keys and base URL
  const consumerKey = "ck_06901b3c80680fb146c908a69bb367ccf9686051";
  const consumerSecret = "cs_b4a83e96f397031fda0f457cb1bd8bad0dca870c";
  const baseUrl = "http://localhost:8889/wp-json/wc/v3";

  // // Helper to encode keys (for Basic Auth)
  // const encodeKeys = (key: string, secret: string) => {
  //   return Buffer.from(`${key}:${secret}`).toString("base64");
  // };

  // // Axios instance with Basic Auth
  // const apiClient = axios.create({
  //   baseURL: baseUrl,
  //   headers: {
  //     Authorization: `Basic ${encodeKeys(consumerKey, consumerSecret)}`,
  //     "Content-Type": "application/json"
  //   }
  // });

  // const request = new ApiRequest();
  // request.setBaseUrl("http://localhost:8889");
  // request.setBasicAuth(consumerKey, consumerSecret);
  // request.get("/wp-json/wc/v3/products");

  // console.log(1);
})();
