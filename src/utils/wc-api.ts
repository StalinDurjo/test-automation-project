import ApiRequest from "src/lib/api-request";

// Error handling utility
const handleError = (error: any, customMessage = "An error occurred") => {
  console.error(customMessage);
  if (error.response) {
    console.error("Response status:", error.response.status);
    console.error("Response data:", error.response.data);
  }
  return error;
};

const api = new ApiRequest();
api.setBaseUrl(process.env.baseUrl);
api.setBasicAuth(process.env.admin_username, process.env.password);

// Get methods
const get = {};
// Create methods
const create = {
  customer: async (payload: unknown) => {
    try {
      const response = await api.post(`/wp-json/wc/v3/customers`, payload);
      return response;
    } catch (error) {
      // console.log(error);
      return handleError(error);
    }
  }
};
// Update methods
const update = {};
// Delete methods
const _delete = {};

export const woocommerceApi = {
  get,
  create,
  update,
  delete: _delete
};
