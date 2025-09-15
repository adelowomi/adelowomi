import { NextRequest, NextResponse } from "next/server";
import { VolunteerService } from "@/lib/services/volunteer.service";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const volunteerForm = await VolunteerService.getVolunteerForm(params.id);

    if (!volunteerForm) {
      return NextResponse.json(
        { error: "Volunteer form not found" },
        { status: 404 }
      );
    }

    // Only return active forms for public access
    if (!volunteerForm.isActive) {
      return NextResponse.json(
        { error: "Volunteer form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(volunteerForm);
  } catch (error) {
    console.error("Error fetching volunteer form:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer form" },
      { status: 500 }
    );
  }
}
