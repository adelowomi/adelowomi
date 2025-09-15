import { NextRequest, NextResponse } from "next/server";
import { VolunteerService } from "@/lib/services/volunteer.service";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    // Transform answers from object format to array format
    const answersArray = Object.entries(data.answers || {}).map(
      ([questionId, answer]) => ({
        questionId,
        answer: String(answer),
      })
    );

    const submission = await VolunteerService.submitVolunteerForm({
      volunteerFormId: params.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      answers: answersArray,
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
