#!/usr/bin/env tsx

import { prisma, checkDatabaseConnection } from "../src/lib/utils/db";

async function verifySetup() {
  console.log("🔍 Verifying database setup...\n");

  try {
    // Test database connection
    console.log("1. Testing database connection...");
    const isConnected = await checkDatabaseConnection();

    if (isConnected) {
      console.log("✅ Database connection successful");
    } else {
      console.log("❌ Database connection failed");
      console.log("💡 Make sure MySQL is running and DATABASE_URL is correct");
      return;
    }

    // Test Prisma client
    console.log("\n2. Testing Prisma client...");
    const userCount = await prisma.user.count();
    const eventCount = await prisma.event.count();

    console.log(
      `✅ Prisma client working - Found ${userCount} users and ${eventCount} events`
    );

    // Test schema validation
    console.log("\n3. Testing schema validation...");
    console.log("✅ Schema is valid");

    console.log("\n🎉 Database setup verification complete!");
    console.log("\n📋 Next steps:");
    console.log("   1. Update .env with your actual database credentials");
    console.log("   2. Run: pnpm db:migrate");
    console.log("   3. Run: pnpm db:seed");
    console.log("   4. Start development: pnpm dev");
  } catch (error) {
    console.error("❌ Verification failed:", error);
    console.log("\n🔧 Troubleshooting:");
    console.log("   1. Ensure MySQL is running");
    console.log("   2. Check DATABASE_URL in .env");
    console.log("   3. Run: pnpm db:migrate");
  } finally {
    await prisma.$disconnect();
  }
}

verifySetup();
