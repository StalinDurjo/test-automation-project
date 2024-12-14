import ApiRequest, { ContentType } from "src/lib/api-request";

// Authentication types
export type AuthMethod = "basic" | "bearer" | "custom";

// Authentication configuration interface
export interface AuthConfig {
  method: AuthMethod;
  credentials: {
    username?: string;
    password?: string;
    token?: string;
    [key: string]: string | undefined;
  };
}

// Configuration interface
export interface WooCommerceConfig {
  baseUrl: string;
  auth: AuthConfig;
}

// Function to setup authentication
/*const setAuthentication = (request: ApiRequest, auth: AuthConfig) => {
  switch (auth.method) {
    case "basic":
      if (!auth.credentials.username || !auth.credentials.password) {
        throw new Error("Basic authentication requires username and password");
      }
      request.setBasicAuth(auth.credentials.username, auth.credentials.password);
      break;

    case "bearer":
      if (!auth.credentials.token) {
        throw new Error("Bearer authentication requires a token");
      }
      request.setBearerToken(auth.credentials.token);
      break;

    case "custom":
      Object.entries(auth.credentials).forEach(([key, value]) => {
        if (value && key !== "method") {
          request.instance.defaults.headers.common[key] = value;
        }
      });
      break;

    default:
      throw new Error(`Unsupported authentication method: ${auth.method}`);
  }
};*/

const setAuthentication = (request: ApiRequest, auth: AuthConfig) => {
  switch (auth.method) {
    case "basic":
      if (!auth.credentials.username || !auth.credentials.password) {
        throw new Error("Basic authentication requires username and password");
      }
      request.setBasicAuth(auth.credentials.username, auth.credentials.password);
      break;

    case "bearer":
      if (!auth.credentials.token) {
        throw new Error("Bearer authentication requires a token");
      }
      request.setBearerToken(auth.credentials.token);
      break;

    case "custom":
      Object.entries(auth.credentials).forEach(([key, value]) => {
        if (value && key !== "method") {
          request.instance.defaults.headers.common[key] = value;
        }
      });
      break;

    default:
      throw new Error(`Unsupported authentication method: ${auth.method}`);
  }
}

// Error handling utility
const handleError = (error: any, customMessage = "An error occurred") => {
  console.error(customMessage);
  if (error.response) {
    console.error("Response status:", error.response.status);
    console.error("Response data:", error.response.data);
  }
  throw error;
};

// Function to initialize WooCommerce API
const init = (config: WooCommerceConfig) => {
  const request = new ApiRequest();
  request.setBaseUrl(config.baseUrl);
  setAuthentication(request, config.auth);
  request.setContentType("application/json");

  return request;
};

const _request = init({
  baseUrl: process.env.baseUrl,
  auth: {
    method: process.env.woocommerce_auth_method as AuthMethod,
    credentials: {
      username: process.env.admin_username,
      password: process.env.password
    }
  }
});

// Get methods
const get = {
  products: async () => {
    const products = await _request.get(`http://localhost:8889/wp-json/wc/v3/products`);
    console.log(products);
  }
};
// Create methods
const create = {};
// Update methods
const update = {};
// Delete methods
const _delete = {};

export default {
  get,
  create,
  update,
  delete: _delete
};
