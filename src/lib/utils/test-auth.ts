/**
 * Test utility for admin authentication
 * Use this to test the authentication flow in development
 */

export const TEST_ADMIN_CREDENTIALS = {
  email: "admin@example.com",
  password: "admin123",
};

export const testAuthFlow = async () => {
  console.log("Testing admin authentication flow...");
  console.log("Default admin credentials:");
  console.log("Email:", TEST_ADMIN_CREDENTIALS.email);
  console.log("Password:", TEST_ADMIN_CREDENTIALS.password);
  console.log("\nTo test:");
  console.log("1. Navigate to /admin/auth");
  console.log("2. Use the credentials above");
  console.log("3. Should redirect to /admin/dashboard on success");
};

// Call this in development to see test credentials
if (process.env.NODE_ENV === "development") {
  testAuthFlow();
}
