#!/usr/bin/env tsx

/**
 * Debug script to check database contents
 * Run with: npx tsx scripts/debug-db.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function debugDatabase() {
  try {
    console.log("🔍 Debugging Database Contents...\n");

    // Check events
    console.log("📅 Events in database:");
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    console.log(`Total events found: ${events.length}`);
    events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      console.log(`   ID: ${event.id}`);
      console.log(`   Status: ${event.status}`);
      console.log(`   Date: ${event.date}`);
      console.log(`   Registrations: ${event._count.registrations}`);
      console.log(`   Created: ${event.createdAt}`);
      console.log("");
    });

    // Check registrations
    console.log("📝 Registrations in database:");
    const registrations = await prisma.registration.findMany({
      include: {
        event: {
          select: { title: true },
        },
      },
    });

    console.log(`Total registrations found: ${registrations.length}`);
    registrations.forEach((reg, index) => {
      console.log(`${index + 1}. ${reg.firstName} ${reg.lastName}`);
      console.log(`   Event: ${reg.event.title}`);
      console.log(`   Email: ${reg.email}`);
      console.log(`   Registered: ${reg.registeredAt}`);
      console.log("");
    });

    // Check gallery
    console.log("🖼️ Gallery images in database:");
    const images = await prisma.gallery.count();
    console.log(`Total images: ${images}`);

    // Check videos
    console.log("🎥 Videos in database:");
    const videos = await prisma.video.count();
    console.log(`Total videos: ${videos}`);

    // Test event stats calculation
    console.log("📊 Event Statistics:");
    const [totalEvents, activeEvents, completedEvents, inactiveEvents] =
      await Promise.all([
        prisma.event.count(),
        prisma.event.count({ where: { status: "ACTIVE" } }),
        prisma.event.count({ where: { status: "COMPLETED" } }),
        prisma.event.count({ where: { status: "INACTIVE" } }),
      ]);

    console.log(`Total Events: ${totalEvents}`);
    console.log(`Active Events: ${activeEvents}`);
    console.log(`Completed Events: ${completedEvents}`);
    console.log(`Inactive Events: ${inactiveEvents}`);
  } catch (error) {
    console.error("❌ Database debug error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the debug
debugDatabase().catch(console.error);
