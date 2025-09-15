#!/usr/bin/env tsx

/**
 * Test script for volunteer form edit and delete functionality
 * This script tests the new PUT and DELETE endpoints for volunteer forms
 */

import { VolunteerService } from "../src/lib/services/volunteer.service";
import { QuestionType } from "@prisma/client";

async function testVolunteerFormEditDelete() {
  console.log("🧪 Testing Volunteer Form Edit and Delete Functionality");
  console.log("=".repeat(60));

  try {
    // First, let's get all existing volunteer forms
    console.log("\n📋 Fetching existing volunteer forms...");
    const existingForms = await VolunteerService.getAllVolunteerForms();
    console.log(`Found ${existingForms.length} existing forms`);

    if (existingForms.length === 0) {
      console.log(
        "❌ No volunteer forms found. Please create a form first to test edit/delete functionality."
      );
      return;
    }

    // Test editing the first form
    const formToEdit = existingForms[0];
    console.log(
      `\n✏️  Testing edit functionality on form: "${formToEdit.title}"`
    );

    const updateData = {
      title: `${formToEdit.title} (Updated)`,
      description: "This form has been updated via the test script",
      isActive: !formToEdit.isActive,
      questions: [
        {
          question: "What is your name?",
          type: QuestionType.TEXT,
          required: true,
          order: 0,
        },
        {
          question: "What is your email?",
          type: QuestionType.EMAIL,
          required: true,
          order: 1,
        },
        {
          question: "What is your preferred volunteer role?",
          type: QuestionType.MULTIPLE_CHOICE,
          required: false,
          options: ["Event Setup", "Registration", "Cleanup", "Photography"],
          order: 2,
        },
      ],
    };

    const updatedForm = await VolunteerService.updateVolunteerForm(
      formToEdit.id,
      updateData
    );

    console.log("✅ Form updated successfully!");
    console.log(`   - Title: ${updatedForm.title}`);
    console.log(`   - Description: ${updatedForm.description}`);
    console.log(`   - Active: ${updatedForm.isActive}`);
    console.log(`   - Questions: ${updatedForm.questions.length}`);

    // Test fetching the updated form
    console.log("\n🔍 Fetching updated form to verify changes...");
    const fetchedForm = await VolunteerService.getVolunteerForm(formToEdit.id);

    if (fetchedForm) {
      console.log("✅ Form fetched successfully after update!");
      console.log(
        `   - Title matches: ${fetchedForm.title === updateData.title}`
      );
      console.log(
        `   - Description matches: ${
          fetchedForm.description === updateData.description
        }`
      );
      console.log(
        `   - Active status matches: ${
          fetchedForm.isActive === updateData.isActive
        }`
      );
      console.log(`   - Questions count: ${fetchedForm.questions.length}`);
    }

    // Test partial update (only metadata, no questions)
    console.log("\n🔄 Testing partial update (metadata only)...");
    const partialUpdateData = {
      title: `${formToEdit.title} (Partially Updated)`,
      description: "This is a partial update test",
    };

    const partiallyUpdatedForm = await VolunteerService.updateVolunteerForm(
      formToEdit.id,
      partialUpdateData
    );

    console.log("✅ Partial update successful!");
    console.log(`   - Title: ${partiallyUpdatedForm.title}`);
    console.log(`   - Description: ${partiallyUpdatedForm.description}`);
    console.log(
      `   - Questions preserved: ${partiallyUpdatedForm.questions.length}`
    );

    // Ask user if they want to test delete functionality
    console.log("\n⚠️  DELETE TEST WARNING:");
    console.log("The next test will DELETE the volunteer form permanently.");
    console.log("This action cannot be undone!");
    console.log(
      "\nTo proceed with delete test, set ALLOW_DELETE_TEST=true in environment"
    );

    if (process.env.ALLOW_DELETE_TEST === "true") {
      console.log("\n🗑️  Testing delete functionality...");

      await VolunteerService.deleteVolunteerForm(formToEdit.id);
      console.log("✅ Form deleted successfully!");

      // Verify deletion
      console.log("\n🔍 Verifying form deletion...");
      const deletedForm = await VolunteerService.getVolunteerForm(
        formToEdit.id
      );

      if (!deletedForm) {
        console.log("✅ Form deletion verified - form no longer exists!");
      } else {
        console.log("❌ Form deletion failed - form still exists!");
      }
    } else {
      console.log(
        "\n⏭️  Skipping delete test (set ALLOW_DELETE_TEST=true to enable)"
      );
    }

    console.log("\n🎉 All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

// Run the test
testVolunteerFormEditDelete()
  .then(() => {
    console.log("\n✨ Test script completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Test script failed:", error);
    process.exit(1);
  });
