import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const NOTIFICATION_EMAIL = "adelowomi@gmail.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      serviceState,
      batch,
      primaryRole,
      otherRole,
      portfolio,
      experience,
      why,
      availability,
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !serviceState || !batch || !primaryRole || !why) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to database
    const application = await prisma.corperApplication.create({
      data: {
        fullName,
        email,
        phone,
        serviceState,
        batch,
        primaryRole,
        otherRole: otherRole || null,
        portfolio: portfolio || null,
        experience: experience || null,
        why,
        availability: availability || null,
      },
    });

    // Send notification email
    try {
      await resend.emails.send({
        from: process.env.NEXT_PUBLIC_EMAIL_SENDER || "noreply@yourdomain.com",
        to: [NOTIFICATION_EMAIL],
        subject: `New Corper Application: ${fullName} — ${primaryRole === "Other" ? otherRole : primaryRole}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; background: #f9fafb; color: #1a1a2e;">
            <div style="background: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e5e7eb;">
              <h1 style="margin: 0 0 4px; font-size: 22px; color: #7c3aed;">New Corper Application</h1>
              <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px;">Submitted ${new Date().toLocaleDateString("en-NG", { dateStyle: "full" })}</p>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500; width: 160px;">Name</td>
                  <td style="padding: 10px 12px;">${fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">Email</td>
                  <td style="padding: 10px 12px;"><a href="mailto:${email}" style="color: #7c3aed;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">Phone</td>
                  <td style="padding: 10px 12px;"><a href="tel:${phone}" style="color: #7c3aed;">${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">State</td>
                  <td style="padding: 10px 12px;">${serviceState}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">NYSC Batch</td>
                  <td style="padding: 10px 12px;">${batch}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">Primary Skill</td>
                  <td style="padding: 10px 12px; font-weight: 600;">${primaryRole === "Other" ? otherRole : primaryRole}</td>
                </tr>
                ${portfolio ? `
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">Portfolio</td>
                  <td style="padding: 10px 12px;"><a href="${portfolio}" style="color: #7c3aed;">${portfolio}</a></td>
                </tr>` : ""}
                ${experience ? `
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">Experience</td>
                  <td style="padding: 10px 12px;">${experience}</td>
                </tr>` : ""}
                <tr style="border-bottom: 1px solid #f3f4f6;">
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">Why</td>
                  <td style="padding: 10px 12px;">${why}</td>
                </tr>
                ${availability ? `
                <tr>
                  <td style="padding: 10px 12px; color: #6b7280; font-weight: 500;">Availability</td>
                  <td style="padding: 10px 12px;">${availability}</td>
                </tr>` : ""}
              </table>
            </div>
            <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
              Application ID: ${application.id}
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      // Log but don't fail the request — the application is already saved
      console.error("Failed to send notification email:", emailError);
    }

    return NextResponse.json(
      { success: true, data: { id: application.id } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);

    if (error instanceof Error && error.name === "PrismaClientKnownRequestError") {
      return NextResponse.json(
        { success: false, error: "Database error. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
