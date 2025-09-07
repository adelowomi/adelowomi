import { prisma } from "../src/lib/utils/db";
import { QuestionType } from "@prisma/client";

async function testVolunteerForms() {
  try {
    console.log("Testing volunteer forms functionality...");

    // First, let's check if we have any events
    const events = await prisma.event.findMany({
      take: 1,
    });

    if (events.length === 0) {
      console.log("No events found. Creating a test event...");
      const testEvent = await prisma.event.create({
        data: {
          title: "Test Event for Volunteers",
          description: "A test event to demonstrate volunteer forms",
          date: new Date("2025-02-15"),
          time: "10:00 AM",
          venue: "Test Venue",
          capacity: 100,
        },
      });
      console.log("Created test event:", testEvent.title);
      events.push(testEvent);
    }

    const event = events[0];
    console.log("Using event:", event.title);

    // Create a volunteer form
    const volunteerForm = await prisma.volunteerForm.create({
      data: {
        eventId: event.id,
        title: "Volunteer Application Form",
        description: "Apply to volunteer for our upcoming event",
        questions: {
          create: [
            {
              question: "What is your experience with event management?",
              type: QuestionType.TEXTAREA,
              required: true,
              order: 0,
            },
            {
              question: "Which area would you like to volunteer in?",
              type: QuestionType.MULTIPLE_CHOICE,
              required: true,
              options: JSON.stringify([
                "Registration",
                "Technical Support",
                "Catering",
                "General Support",
              ]),
              order: 1,
            },
            {
              question: "Are you available for the full duration of the event?",
              type: QuestionType.MULTIPLE_CHOICE,
              required: true,
              options: JSON.stringify(["Yes", "No", "Partially"]),
              order: 2,
            },
            {
              question: "Any additional comments or special requirements?",
              type: QuestionType.TEXTAREA,
              required: false,
              order: 3,
            },
          ],
        },
      },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
      },
    });

    console.log("Created volunteer form:", volunteerForm.title);
    console.log("Questions:", volunteerForm.questions.length);

    // Create a test submission
    const submission = await prisma.volunteerSubmission.create({
      data: {
        volunteerFormId: volunteerForm.id,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        answers: {
          create: [
            {
              questionId: volunteerForm.questions[0].id,
              answer:
                "I have 3 years of experience organizing community events and managing volunteer teams.",
            },
            {
              questionId: volunteerForm.questions[1].id,
              answer: "Technical Support",
            },
            {
              questionId: volunteerForm.questions[2].id,
              answer: "Yes",
            },
            {
              questionId: volunteerForm.questions[3].id,
              answer:
                "I have my own laptop and can help with AV setup if needed.",
            },
          ],
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    console.log(
      "Created test submission from:",
      submission.firstName,
      submission.lastName
    );
    console.log("Answers:", submission.answers.length);

    // Test fetching volunteer forms
    const allForms = await prisma.volunteerForm.findMany({
      include: {
        event: true,
        questions: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    console.log("Total volunteer forms:", allForms.length);
    allForms.forEach((form) => {
      console.log(
        `- ${form.title} (Event: ${form.event.title}) - ${form._count.submissions} submissions`
      );
    });

    // Test fetching submissions
    const submissions = await prisma.volunteerSubmission.findMany({
      where: { volunteerFormId: volunteerForm.id },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });

    console.log("Submissions for form:", submissions.length);
    submissions.forEach((sub) => {
      console.log(`- ${sub.firstName} ${sub.lastName} (${sub.email})`);
      sub.answers.forEach((answer) => {
        console.log(`  Q: ${answer.question.question}`);
        console.log(`  A: ${answer.answer}`);
      });
    });

    console.log(
      "✅ Volunteer forms functionality test completed successfully!"
    );
  } catch (error) {
    console.error("❌ Error testing volunteer forms:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testVolunteerForms();
