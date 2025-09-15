#!/usr/bin/env tsx

/**
 * Test script for registration service deletion functionality
 * This script tests the RegistrationService.deleteRegistration method directly
 */

import { PrismaClient } from "@prisma/client";
import { RegistrationService } from "../src/lib/services/registration.service";

const prisma = new PrismaClient();

interface TestResult {
  test: string;
  passed: boolean;
  message: string;
}

async function createTestRegistration() {
  // Create a test event first
  const testEvent = await prisma.event.create({
    data: {
      title: "Test Event for Registration Delete Service",
      description: "Test event for testing registration deletion service",
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
      email: "test-service-delete@example.com",
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

async function testRegistrationServiceDeletion(): Promise<TestResult[]> {
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
    const registrationBefore = await RegistrationService.getRegistrationById(
      testRegistration.id
    );

    results.push({
      test: "Get registration before deletion",
      passed:
        !!registrationBefore && registrationBefore.id === testRegistration.id,
      message: registrationBefore
        ? "Registration found successfully"
        : "Failed to get registration",
    });

    // Test 2: Delete the registration
    console.log("🗑️ Test 2: Delete registration");
    try {
      await RegistrationService.deleteRegistration(testRegistration.id);
      results.push({
        test: "Delete registration service method",
        passed: true,
        message: "Registration deleted successfully",
      });
    } catch (error) {
      results.push({
        test: "Delete registration service method",
        passed: false,
        message: `Failed to delete registration: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    }

    // Test 3: Verify registration is deleted
    console.log("✅ Test 3: Verify registration is deleted");
    const registrationAfter = await RegistrationService.getRegistrationById(
      testRegistration.id
    );

    results.push({
      test: "Verify registration deletion",
      passed: !registrationAfter,
      message: !registrationAfter
        ? "Registration successfully deleted"
        : "Registration still exists after deletion",
    });

    // Test 4: Try to delete non-existent registration
    console.log("❌ Test 4: Delete non-existent registration");
    try {
      await RegistrationService.deleteRegistration("non-existent-id");
      results.push({
        test: "Delete non-existent registration",
        passed: false,
        message: "Should have thrown an error for non-existent registration",
      });
    } catch (error) {
      results.push({
        test: "Delete non-existent registration",
        passed: true,
        message: "Correctly threw error for non-existent registration",
      });
    }

    // Test 5: Test registration count functionality
    console.log("📊 Test 5: Test registration count functionality");
    const count = await RegistrationService.getEventRegistrationCount(
      testEvent.id
    );

    results.push({
      test: "Get event registration count",
      passed: count === 0, // Should be 0 since we deleted the registration
      message: `Registration count: ${count} (expected: 0)`,
    });
  } catch (error) {
    results.push({
      test: "Registration service test setup",
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

async function runServiceTests() {
  console.log("🚀 Starting Registration Service Deletion Tests...\n");

  try {
    const results = await testRegistrationServiceDeletion();

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
        "🎉 All service tests passed! Registration deletion service is working correctly."
      );
    } else {
      console.log(
        "⚠️ Some service tests failed. Please check the implementation."
      );
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Service test execution failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runServiceTests();
}

export { runServiceTests, testRegistrationServiceDeletion };
