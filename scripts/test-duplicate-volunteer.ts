import { VolunteerService } from "../src/lib/services/volunteer.service";

async function testDuplicateVolunteerSubmission() {
  console.log("Testing duplicate volunteer submission handling...");

  // Test data
  const testData = {
    volunteerFormId: "test-form-id", // You'll need to replace with actual form ID
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
    phone: "555-123-4567",
    answers: [
      {
        questionId: "test-question-id",
        answer: "Test answer",
      },
    ],
  };

  try {
    // First submission should succeed
    console.log("Attempting first submission...");
    const firstSubmission = await VolunteerService.submitVolunteerForm(
      testData
    );
    console.log("✅ First submission successful:", firstSubmission.id);

    // Second submission should fail with duplicate error
    console.log("Attempting duplicate submission...");
    const secondSubmission = await VolunteerService.submitVolunteerForm(
      testData
    );
    console.log("❌ Second submission should have failed but didn't");
  } catch (error: any) {
    if (error.message?.startsWith("DUPLICATE_SUBMISSION:")) {
      console.log("✅ Duplicate submission correctly detected:", error.message);
    } else {
      console.log("❌ Unexpected error:", error.message);
    }
  }
}

// Only run if called directly
if (require.main === module) {
  testDuplicateVolunteerSubmission()
    .then(() => {
      console.log("Test completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Test failed:", error);
      process.exit(1);
    });
}
