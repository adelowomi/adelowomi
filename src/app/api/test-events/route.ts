import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/utils/db";

export async function GET(request: NextRequest) {
  try {
    console.log("Testing database connection...");

    // Test basic database connection
    const eventCount = await prisma.event.count();
    console.log("Event count:", eventCount);

    // Get all events
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: { registrations: true },
        },
      },
    });

    console.log("Raw events from database:", events);

    return NextResponse.json({
      success: true,
      eventCount,
      events,
      message: "Database connection successful",
    });
  } catch (error) {
    console.error("Database test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
