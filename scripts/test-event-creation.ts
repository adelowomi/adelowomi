#!/usr/bin/env tsx

/**
 * Test script to debug event creation issues
 */

import { EventService } from "../src/lib/services/event.service";
import { EventStatus } from "../src/types/event.types";

async function testEventCreation() {
  console.log("Testing event creation...");

  try {
    // Test basic event creation without file
    const basicEventData = {
      title: "Test Event",
      description: "This is a test event",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      time: "14:00",
      venue: "Test Venue",
      capacity: 100,
      status: EventStatus.ACTIVE,
    };

    console.log("Creating basic event...");
    const basicEvent = await EventService.createEvent(basicEventData);
    console.log("Basic event created successfully:", basicEvent.id);

    // Test event creation with file (this will likely fail due to Google Drive config)
    console.log("\nTesting event creation with file...");

    // Create a mock file buffer
    const mockFileBuffer = Buffer.from("mock image data");
    const eventWithFileData = {
      title: "Test Event with File",
      description: "This is a test event with file",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      time: "15:00",
      venue: "Test Venue 2",
      capacity: 150,
      status: EventStatus.ACTIVE,
      flyerFile: {
        name: "test-flyer.jpg",
        type: "image/jpeg",
        size: mockFileBuffer.length,
        buffer: mockFileBuffer,
      },
    };

    const eventWithFile = await EventService.createEventWithFile(
      eventWithFileData
    );
    console.log("Event with file created successfully:", eventWithFile.id);
  } catch (error) {
    console.error("Event creation failed:", error);

    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
  }
}

// Run the test
testEventCreation().catch(console.error);
