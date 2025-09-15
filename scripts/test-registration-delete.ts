#!/usr/bin/env tsx

/**
 * Test script for registration deletion functionality
 * This script tests the new DELETE /api/admin/registrations/[id] endpoint
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TestResult {
  test: string;
  passed: boolean;
  message: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function makeRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    return { response, data };
  } catch (error) {
    console.error(`Request failed for ${endpoint}:`, error);
    throw error;
  }
}

async function createTestRegistration() {
  // Create a test event first
  const testEvent = await prisma.event.create({
    data: {
      title: "Test Event for Registration Delete",
      description: "Test event for testing registration deletion",
      date: new Date("2025-12-01"),
      time: "10:00 AM",
      venue: "Test Venue",
      capacity: 100,
      status: "ACTIVE",
    },
  });

  // Create a test registration
  const testRegistration = await prisma.registration.create({
    data: {
      eventId: testEvent.id,
      firstName: "Test",
      lastName: "User",
      email: "test-delete@example.com",
      phone: "1234567890",
      status: "STUDENT",
      course: "Computer Science",
      areaOfInterest: "Software Development",
    },
  });

  return { testEvent, testRegistration };
}

async function cleanupTestData(eventId: string) {
  // Delete all registrations for the test event
  await prisma.registration.deleteMany({
    where: { eventId },
  });

  // Delete the test event
  await prisma.event.delete({
    where: { id: eventId },
  });
}

async function testRegistrationDeletion(): Promise<TestResult[]> {
  const results: TestResult[] = [];
  let testEvent: any = null;
  let testRegistration: any = null;

  try {
    // Setup test data
    console.log("🔧 Setting up test data...");
    const testData = await createTestRegistration();
    testEvent = testData.testEvent;
    testRegistration = testData.testRegistration;

    // Test 1: Get registration before deletion
    console.log("📋 Test 1: Get registration before deletion");
    const { response: getResponse, data: getResult } = await makeRequest(
      `/api/admin/registrations/${testRegistration.id}`
    );

    results.push({
      test: "GET registration before deletion",
      passed:
        getResponse.status === 200 &&
        getResult?.data?.id === testRegistration.id,
      message:
        getResponse.status === 200
          ? "Registration found successfully"
          : `Failed to get registration: ${getResponse.status}`,
    });

    // Test 2: Delete the registration
    console.log("🗑️ Test 2: Delete registration");
    const { response: deleteResponse, data: deleteResult } = await makeRequest(
      `/api/admin/registrations/${testRegistration.id}`,
      { method: "DELETE" }
    );

    results.push({
      test: "DELETE registration",
      passed:
        deleteResponse.status === 200 &&
        deleteResult?.data?.message?.includes("deleted"),
      message:
        deleteResponse.status === 200
          ? "Registration deleted successfully"
          : `Failed to delete registration: ${deleteResponse.status} - ${
              deleteResult?.message || "Unknown error"
            }`,
    });

    // Test 3: Verify registration is deleted
    console.log("✅ Test 3: Verify registration is deleted");
    const { response: verifyResponse } = await makeRequest(
      `/api/admin/registrations/${testRegistration.id}`
    );

    results.push({
      test: "Verify registration deletion",
      passed: verifyResponse.status === 404,
      message:
        verifyResponse.status === 404
          ? "Registration successfully deleted (404 as expected)"
          : `Registration still exists: ${verifyResponse.status}`,
    });

    // Test 4: Try to delete non-existent registration
    console.log("❌ Test 4: Delete non-existent registration");
    const { response: notFoundResponse } = await makeRequest(
      `/api/admin/registrations/non-existent-id`,
      { method: "DELETE" }
    );

    results.push({
      test: "Delete non-existent registration",
      passed: notFoundResponse.status === 404,
      message:
        notFoundResponse.status === 404
          ? "Correctly returned 404 for non-existent registration"
          : `Unexpected status: ${notFoundResponse.status}`,
    });

    // Test 5: Try to delete with invalid ID format
    console.log("🔍 Test 5: Delete with invalid ID format");
    const { response: invalidResponse } = await makeRequest(
      `/api/admin/registrations/invalid-id-format!@#`,
      { method: "DELETE" }
    );

    results.push({
      test: "Delete with invalid ID format",
      passed: invalidResponse.status === 400,
      message:
        invalidResponse.status === 400
          ? "Correctly validated ID format"
          : `Unexpected status: ${invalidResponse.status}`,
    });
  } catch (error) {
    results.push({
      test: "Registration deletion test setup",
      passed: false,
      message: `Test setup failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });
  } finally {
    // Cleanup
    if (testEvent) {
      try {
        console.log("🧹 Cleaning up test data...");
        await cleanupTestData(testEvent.id);
      } catch (error) {
        console.error("Cleanup failed:", error);
      }
    }
  }

  return results;
}

async function runTests() {
  console.log("🚀 Starting Registration Deletion Tests...\n");

  try {
    const results = await testRegistrationDeletion();

    console.log("\n📊 Test Results:");
    console.log("================");

    let passed = 0;
    let total = results.length;

    results.forEach((result, index) => {
      const status = result.passed ? "✅ PASS" : "❌ FAIL";
      console.log(`${index + 1}. ${result.test}: ${status}`);
      console.log(`   ${result.message}\n`);

      if (result.passed) passed++;
    });

    console.log(`Summary: ${passed}/${total} tests passed`);

    if (passed === total) {
      console.log(
        "🎉 All tests passed! Registration deletion functionality is working correctly."
      );
    } else {
      console.log("⚠️ Some tests failed. Please check the implementation.");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Test execution failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests();
}

export { runTests, testRegistrationDeletion };
