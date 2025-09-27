import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import {
  createSuccessResponse,
  createNotFoundResponse,
  createValidationErrorResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * PATCH /api/attendance/[id]
 * Mark attendance for a registration
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const registrationId = params.id;
    const body = await request.json();

    if (typeof body.attended !== "boolean") {
      return createValidationErrorResponse({
        attended: ["Attended field must be a boolean value"]
      });
    }

    const { attended } = body;

    // Mark attendance
    const updatedRegistration = await RegistrationService.markAttendance(
      registrationId,
      attended
    );

    return createSuccessResponse(
      {
        id: updatedRegistration.id,
        attended: updatedRegistration.attended,
        attendedAt: updatedRegistration.attendedAt,
        message: attended ? "Attendance marked successfully" : "Attendance unmarked successfully"
      },
      200
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Registration not found") {
      return createNotFoundResponse("Registration");
    }
    return handleRouteError(error);
  }
}
