#!/usr/bin/env node

// Simple test script to debug registration API
async function testRegistration() {
  const testData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "1234567890",
    status: "STUDENT",
    course: "Computer Science",
    areaOfInterest: "Software Engineering",
    expectations: "Learn new skills",
  };

  try {
    console.log("🧪 Testing registration API...");
    console.log("📤 Sending data:", JSON.stringify(testData, null, 2));

    const response = await fetch(
      "http://localhost:3001/api/events/test-event-id/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      }
    );

    console.log("📥 Response status:", response.status);
    console.log(
      "📥 Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseData = await response.text();
    console.log("📥 Response body:", responseData);

    if (!response.ok) {
      console.error("❌ Registration failed with status:", response.status);
      try {
        const errorData = JSON.parse(responseData);
        console.error("❌ Error details:", errorData);
      } catch (e) {
        console.error("❌ Raw error response:", responseData);
      }
    } else {
      console.log("✅ Registration successful!");
    }
  } catch (error) {
    console.error("❌ Network error:", error.message);
  }
}

testRegistration();
