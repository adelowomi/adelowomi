#!/usr/bin/env tsx

/**
 * Test script for admin APIs
 * Run with: npx tsx scripts/test-admin-apis.ts
 */

const BASE_URL = "http://localhost:3002";

interface TestResult {
  endpoint: string;
  method: string;
  status: number;
  success: boolean;
  error?: string;
}

const testResults: TestResult[] = [];

async function testEndpoint(
  endpoint: string,
  method: string = "GET",
  body?: any,
  headers: Record<string, string> = {}
): Promise<TestResult> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    const result: TestResult = {
      endpoint,
      method,
      status: response.status,
      success: response.ok,
    };

    if (!response.ok) {
      const errorText = await response.text();
      result.error = errorText;
    }

    return result;
  } catch (error) {
    return {
      endpoint,
      method,
      status: 0,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function runTests() {
  console.log("🧪 Testing Admin APIs...\n");

  // Test admin dashboard stats
  console.log("📊 Testing Dashboard APIs...");
  testResults.push(await testEndpoint("/api/admin/dashboard/stats"));

  // Test admin events APIs
  console.log("📅 Testing Events APIs...");
  testResults.push(await testEndpoint("/api/admin/events"));
  testResults.push(
    await testEndpoint("/api/admin/events", "POST", {
      title: "Test Event",
      description: "Test event description",
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      time: "18:00",
      venue: "Test Venue",
      capacity: 100,
    })
  );

  // Test admin registrations APIs
  console.log("📝 Testing Registrations APIs...");
  testResults.push(await testEndpoint("/api/admin/registrations"));

  // Test admin gallery APIs
  console.log("🖼️ Testing Gallery APIs...");
  testResults.push(await testEndpoint("/api/admin/gallery"));

  // Test admin videos APIs
  console.log("🎥 Testing Videos APIs...");
  testResults.push(await testEndpoint("/api/admin/videos"));

  // Print results
  console.log("\n📋 Test Results:");
  console.log("================");

  testResults.forEach((result) => {
    const status = result.success ? "✅" : "❌";
    console.log(
      `${status} ${result.method} ${result.endpoint} - ${result.status}`
    );
    if (result.error) {
      console.log(`   Error: ${result.error.substring(0, 100)}...`);
    }
  });

  const successCount = testResults.filter((r) => r.success).length;
  const totalCount = testResults.length;

  console.log(`\n📈 Summary: ${successCount}/${totalCount} tests passed`);

  if (successCount === totalCount) {
    console.log("🎉 All tests passed!");
  } else {
    console.log("⚠️ Some tests failed. Check the errors above.");
  }
}

// Run the tests
runTests().catch(console.error);
