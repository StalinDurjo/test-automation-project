const { ADMIN_USERNAME, PASSWORD, ADMIN_EMAIL, CUSTOMER_EMAIL } = process.env;

const admin = {
  username: ADMIN_USERNAME || "admin",
  password: PASSWORD || "password",
  email: ADMIN_EMAIL || "admin@example.com"
};

const customer = {
  email: CUSTOMER_EMAIL,
  first_name: "Brad",
  last_name: "Traversy",
  username: "brad.traversy",
  password: PASSWORD,
  us: {
    billing: {
      first_name: "Brad",
      last_name: "Traversy",
      company: "",
      address_1: "One Apple Park Way",
      address_2: "",
      city: "Cupertino",
      state: "CA",
      postcode: "95014",
      country: "US",
      email: "brad.traversy@example.com",
      phone: "(201) 455-6565"
    },
    shipping: {
      first_name: "Brad",
      last_name: "Traversy",
      company: "",
      address_1: "One Apple Park Way",
      address_2: "",
      city: "Cupertino",
      state: "CA",
      postcode: "95014",
      country: "US"
    }
  }
};

export const testData = {
  admin,
  customer
};
