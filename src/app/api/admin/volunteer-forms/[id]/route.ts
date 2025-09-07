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
    return NextResponse.json(volunteerForm);
  } catch (error) {
    console.error("Error fetching volunteer form:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer form" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { isActive } = await request.json();
    const volunteerForm = await VolunteerService.updateVolunteerFormStatus(
      params.id,
      isActive
    );
    return NextResponse.json(volunteerForm);
  } catch (error) {
    console.error("Error updating volunteer form:", error);
    return NextResponse.json(
      { error: "Failed to update volunteer form" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await VolunteerService.deleteVolunteerForm(params.id);
    return NextResponse.json({
      message: "Volunteer form deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting volunteer form:", error);
    return NextResponse.json(
      { error: "Failed to delete volunteer form" },
      { status: 500 }
    );
  }
}
