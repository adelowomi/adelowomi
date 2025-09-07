import { NextResponse } from "next/server";
import { prisma } from "@/lib/utils/db";

export async function GET() {
  try {
    // Get all active volunteer forms with their event information
    const volunteerForms = await prisma.volunteerForm.findMany({
      where: {
        isActive: true,
        event: {
          status: "ACTIVE", // Only show forms for active events
        },
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            venue: true,
          },
        },
      },
      orderBy: [
        { event: { date: "asc" } }, // Sort by event date first
        { createdAt: "desc" }, // Then by form creation date
      ],
    });

    return NextResponse.json(volunteerForms);
  } catch (error) {
    console.error("Error fetching volunteer forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer forms" },
      { status: 500 }
    );
  }
}
