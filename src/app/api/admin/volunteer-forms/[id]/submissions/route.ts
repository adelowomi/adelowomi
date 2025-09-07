import { NextRequest, NextResponse } from "next/server";
import { VolunteerService } from "@/lib/services/volunteer.service";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submissions = await VolunteerService.getVolunteerFormSubmissions(
      params.id
    );
    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching volunteer form submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch volunteer form submissions" },
      { status: 500 }
    );
  }
}
