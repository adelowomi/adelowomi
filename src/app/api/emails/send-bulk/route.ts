import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventId, recipientType, subject, message, htmlMessage } = body;

    // Validate required fields
    if (!eventId || !recipientType || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, recipientType, subject, message' },
        { status: 400 }
      );
    }

    // Validate recipient type
    if (!['attendees', 'volunteers', 'both'].includes(recipientType)) {
      return NextResponse.json(
        { error: 'Invalid recipientType. Must be: attendees, volunteers, or both' },
        { status: 400 }
      );
    }

    // Get event details
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, title: true }
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    let recipients: string[] = [];

    // Get attendees (registrations)
    if (recipientType === 'attendees' || recipientType === 'both') {
      const registrations = await prisma.registration.findMany({
        where: { eventId },
        select: { email: true }
      });
      recipients.push(...registrations.map(r => r.email));
    }

    // Get volunteers
    if (recipientType === 'volunteers' || recipientType === 'both') {
      const volunteerSubmissions = await prisma.volunteerSubmission.findMany({
        where: {
          volunteerForm: {
            eventId
          }
        },
        select: { email: true }
      });
      recipients.push(...volunteerSubmissions.map(v => v.email));
    }

    // Remove duplicates
    recipients = [...new Set(recipients)];

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: 'No recipients found for the specified criteria' },
        { status: 400 }
      );
    }

    // Send individual emails to avoid exposing recipient email addresses
    const results = [];
    const errors = [];

    // Check if message contains HTML tags (from rich text editor)
    const isHtmlMessage = /<[a-z][\s\S]*>/i.test(message);

    // Prepare email template
    const htmlTemplate = htmlMessage || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; color: #333333;">
        <h2 style="color: #732383; margin-bottom: 20px; font-size: 24px;">${event.title}</h2>
        <div style="line-height: 1.6; margin-bottom: 30px;">
          ${isHtmlMessage ? message : message.replace(/\n/g, '<br>')}
        </div>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px; margin: 0;">
          This email was sent regarding the event: ${event.title}
        </p>
      </div>
    `;
    const textContent = message.replace(/<[^>]*>/g, ''); // Strip HTML tags for text version

    // Send individual emails to each recipient
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];

      try {
        const { data, error } = await resend.emails.send({
          from: process.env.NEXT_PUBLIC_EMAIL_SENDER || 'noreply@yourdomain.com',
          to: [recipient], // Send to individual recipient only
          subject: subject,
          html: htmlTemplate,
          text: textContent
        });

        if (error) {
          errors.push({ recipient, error });
        } else {
          results.push({ recipient, data });
        }
      } catch (emailError) {
        errors.push({ recipient, error: emailError });
      }
    }

    return NextResponse.json({
      success: true,
      totalRecipients: recipients.length,
      successfulEmails: results.length,
      failedEmails: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Bulk email error:', error);
    return NextResponse.json(
      { error: 'Failed to send bulk emails' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
