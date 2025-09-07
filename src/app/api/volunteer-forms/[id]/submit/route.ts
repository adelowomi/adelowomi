import { NextRequest, NextResponse } from "next/server";
import { VolunteerService } from "@/lib/services/volunteer.service";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const submission = await VolunteerService.submitVolunteerForm({
      ...data,
      volunteerFormId: params.id,
    });
    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Error submitting volunteer form:", error);
    return NextResponse.json(
      { error: "Failed to submit volunteer form" },
      { status: 500 }
    );
  }
}
