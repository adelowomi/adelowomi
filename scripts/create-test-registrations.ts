#!/usr/bin/env tsx

/**
 * Script to create test registrations for testing the registrants page
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createTestRegistrations() {
  console.log("🔧 Creating test registrations...");

  try {
    // First, let's find or create a test event
    let testEvent = await prisma.event.findFirst({
      where: {
        title: {
          contains: "Test Event",
        },
      },
    });

    if (!testEvent) {
      testEvent = await prisma.event.create({
        data: {
          title: "Test Event for Registrations",
          description: "A test event to demonstrate registration management",
          date: new Date("2025-12-15"),
          time: "2:00 PM",
          venue: "Test Conference Center",
          capacity: 100,
          status: "ACTIVE",
        },
      });
      console.log("✅ Created test event:", testEvent.title);
    } else {
      console.log("✅ Using existing test event:", testEvent.title);
    }

    // Create test registrations
    const testRegistrations = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        status: "STUDENT" as const,
        course: "Computer Science",
        areaOfInterest: "Web Development",
        expectations: "Learn about modern web technologies",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        status: "GRADUATE" as const,
        areaOfInterest: "Data Science",
        expectations: "Network with professionals",
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@example.com",
        phone: "5555551234",
        status: "STUDENT" as const,
        course: "Software Engineering",
        areaOfInterest: "Mobile Development",
      },
      {
        firstName: "Sarah",
        lastName: "Wilson",
        email: "sarah.wilson@example.com",
        phone: "5555555678",
        status: "GRADUATE" as const,
        areaOfInterest: "DevOps",
        expectations: "Learn about cloud technologies",
      },
      {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@example.com",
        phone: "5555559012",
        status: "STUDENT" as const,
        course: "Information Technology",
        areaOfInterest: "Cybersecurity",
      },
    ];

    let createdCount = 0;
    let skippedCount = 0;

    for (const regData of testRegistrations) {
      try {
        // Check if registration already exists
        const existing = await prisma.registration.findUnique({
          where: {
            eventId_email: {
              eventId: testEvent.id,
              email: regData.email,
            },
          },
        });

        if (existing) {
          console.log(`⏭️ Skipping existing registration: ${regData.email}`);
          skippedCount++;
          continue;
        }

        await prisma.registration.create({
          data: {
            eventId: testEvent.id,
            ...regData,
          },
        });

        console.log(
          `✅ Created registration: ${regData.firstName} ${regData.lastName}`
        );
        createdCount++;
      } catch (error) {
        console.error(
          `❌ Failed to create registration for ${regData.email}:`,
          error
        );
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${createdCount} registrations`);
    console.log(`   Skipped: ${skippedCount} existing registrations`);
    console.log(`   Event: ${testEvent.title} (ID: ${testEvent.id})`);
    console.log(`\n🎉 Test registrations setup complete!`);
    console.log(
      `\n🔗 You can now view them at: http://localhost:3000/admin/events/registrants`
    );
  } catch (error) {
    console.error("❌ Failed to create test registrations:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  createTestRegistrations();
}

export { createTestRegistrations };
