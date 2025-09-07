import { NextRequest, NextResponse } from "next/server";
import { VolunteerService } from "@/lib/services/volunteer.service";

export async function GET() {
  try {
    const volunteerForms = await VolunteerService.getAllVolunteerForms();
    return NextResponse.json(volunteerForms);
  } catch (error) {
    console.error("Error fetching volunteer forms:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer forms" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const volunteerForm = await VolunteerService.createVolunteerForm(data);
    return NextResponse.json(volunteerForm, { status: 201 });
  } catch (error) {
    console.error("Error creating volunteer form:", error);
    return NextResponse.json(
      { error: "Failed to create volunteer form" },
      { status: 500 }
    );
  }
}
