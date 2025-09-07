#!/usr/bin/env node

/**
 * Comprehensive Integration Test Script
 * Tests all API endpoints and workflows for the API layer
 */

const BASE_URL = "http://localhost:3002";

// Test utilities
async function makeRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();
  return { response, data, status: response.status };
}

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  errors: [],
};

function logTest(testName, passed, error = null) {
  if (passed) {
    console.log(`✅ ${testName}`);
    testResults.passed++;
  } else {
    console.log(`❌ ${testName}`);
    testResults.failed++;
    if (error) {
      testResults.errors.push({ test: testName, error: error.message });
    }
  }
}

// Test 1: Public Events API
async function testPublicEventsAPI() {
  console.log("\n🔍 Testing Public Events API...");

  try {
    // Test GET /api/events
    const { response, data } = await makeRequest("/api/events");
    logTest("GET /api/events returns 200", response.ok);
    logTest(
      "Events response has correct structure",
      data.success !== undefined
    );

    // Test GET /api/events/[id] with invalid ID
    const { response: invalidResponse } = await makeRequest(
      "/api/events/invalid-id"
    );
    logTest(
      "GET /api/events/[invalid-id] returns 404",
      invalidResponse.status === 404
    );
  } catch (error) {
    logTest("Public Events API", false, error);
  }
}

// Test 2: Registration API
async function testRegistrationAPI() {
  console.log("\n🔍 Testing Registration API...");

  try {
    // First create a test event (this will fail without auth, but we'll test the endpoint)
    const testRegistration = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
      phone: "1234567890",
      status: "STUDENT",
      areaOfInterest: "Technology",
      expectations: "Learn new skills",
    };

    // Test registration with invalid event ID
    const { response } = await makeRequest("/api/events/invalid-id/register", {
      method: "POST",
      body: JSON.stringify(testRegistration),
    });

    logTest(
      "POST /api/events/[invalid-id]/register handles invalid event",
      response.status === 404
    );
  } catch (error) {
    logTest("Registration API", false, error);
  }
}

// Test 3: Gallery API
async function testGalleryAPI() {
  console.log("\n🔍 Testing Gallery API...");

  try {
    // Test GET /api/gallery
    const { response, data } = await makeRequest("/api/gallery");
    logTest("GET /api/gallery returns 200", response.ok);
    logTest(
      "Gallery response has correct structure",
      data.success !== undefined
    );

    // Test GET /api/gallery/event/[eventId]
    const { response: eventGalleryResponse } = await makeRequest(
      "/api/gallery/event/test-event-id"
    );
    logTest(
      "GET /api/gallery/event/[eventId] returns response",
      eventGalleryResponse.status !== 500
    );
  } catch (error) {
    logTest("Gallery API", false, error);
  }
}

// Test 4: Video API
async function testVideoAPI() {
  console.log("\n🔍 Testing Video API...");

  try {
    // Test GET /api/videos
    const { response, data } = await makeRequest("/api/videos");
    logTest("GET /api/videos returns 200", response.ok);
    logTest(
      "Videos response has correct structure",
      data.success !== undefined
    );

    // Test GET /api/videos/category/[category]
    const { response: categoryResponse } = await makeRequest(
      "/api/videos/category/EVENT"
    );
    logTest(
      "GET /api/videos/category/[category] returns response",
      categoryResponse.status !== 500
    );
  } catch (error) {
    logTest("Video API", false, error);
  }
}

// Test 5: Authentication API
async function testAuthenticationAPI() {
  console.log("\n🔍 Testing Authentication API...");

  try {
    // Test login with invalid credentials
    const { response } = await makeRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "invalid@test.com",
        password: "wrongpassword",
      }),
    });

    logTest(
      "POST /api/auth/login handles invalid credentials",
      response.status === 401
    );

    // Test session endpoint
    const { response: sessionResponse } = await makeRequest(
      "/api/auth/session"
    );
    logTest(
      "GET /api/auth/session returns response",
      sessionResponse.status !== 500
    );
  } catch (error) {
    logTest("Authentication API", false, error);
  }
}

// Test 6: Admin API (without authentication - should fail)
async function testAdminAPIProtection() {
  console.log("\n🔍 Testing Admin API Protection...");

  try {
    // Test admin endpoints without authentication
    const adminEndpoints = [
      "/api/admin/events",
      "/api/admin/gallery",
      "/api/admin/videos",
      "/api/admin/dashboard/stats",
    ];

    for (const endpoint of adminEndpoints) {
      const { response } = await makeRequest(endpoint);
      logTest(`${endpoint} requires authentication`, response.status === 401);
    }
  } catch (error) {
    logTest("Admin API Protection", false, error);
  }
}

// Test 7: Error Handling
async function testErrorHandling() {
  console.log("\n🔍 Testing Error Handling...");

  try {
    // Test non-existent endpoint
    const { response } = await makeRequest("/api/nonexistent");
    logTest("Non-existent endpoint returns 404", response.status === 404);

    // Test malformed JSON
    const { response: malformedResponse } = await makeRequest(
      "/api/events/test/register",
      {
        method: "POST",
        body: "invalid json",
        headers: { "Content-Type": "application/json" },
      }
    );
    logTest(
      "Malformed JSON handled gracefully",
      malformedResponse.status >= 400
    );
  } catch (error) {
    logTest("Error Handling", false, error);
  }
}

// Test 8: Database Connection
async function testDatabaseConnection() {
  console.log("\n🔍 Testing Database Connection...");

  try {
    // Test any endpoint that requires database access
    const { response } = await makeRequest("/api/events");
    logTest("Database connection working", response.status !== 500);
  } catch (error) {
    logTest("Database Connection", false, error);
  }
}

// Main test runner
async function runIntegrationTests() {
  console.log("🚀 Starting Integration Tests for API Layer\n");
  console.log("Testing against:", BASE_URL);

  // Wait for server to be ready
  console.log("⏳ Waiting for server to be ready...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    await testPublicEventsAPI();
    await testRegistrationAPI();
    await testGalleryAPI();
    await testVideoAPI();
    await testAuthenticationAPI();
    await testAdminAPIProtection();
    await testErrorHandling();
    await testDatabaseConnection();

    // Print summary
    console.log("\n📊 Test Summary:");
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(
      `📈 Success Rate: ${(
        (testResults.passed / (testResults.passed + testResults.failed)) *
        100
      ).toFixed(1)}%`
    );

    if (testResults.errors.length > 0) {
      console.log("\n🐛 Errors:");
      testResults.errors.forEach(({ test, error }) => {
        console.log(`  - ${test}: ${error}`);
      });
    }

    // Exit with appropriate code
    process.exit(testResults.failed > 0 ? 1 : 0);
  } catch (error) {
    console.error("❌ Integration test runner failed:", error.message);
    process.exit(1);
  }
}

// Check if server is running
async function checkServerHealth() {
  try {
    const response = await fetch(`${BASE_URL}/api/events`);
    return response.status !== undefined;
  } catch (error) {
    return false;
  }
}

// Start tests
(async () => {
  const serverRunning = await checkServerHealth();
  if (!serverRunning) {
    console.error("❌ Server is not running at", BASE_URL);
    console.log("Please start the development server with: npm run dev");
    process.exit(1);
  }

  await runIntegrationTests();
})();
