import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/utils/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;

    // Get active volunteer forms for this event
    const volunteerForms = await prisma.volunteerForm.findMany({
      where: {
        eventId,
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
      orderBy: {
        createdAt: "desc",
      },
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
