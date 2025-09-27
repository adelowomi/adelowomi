import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, htmlMessage } = body;

    // Validate required fields
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Check if message contains HTML tags (from rich text editor)
    const isHtmlMessage = /<[a-z][\s\S]*>/i.test(message);

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.NEXT_PUBLIC_EMAIL_SENDER || 'noreply@yourdomain.com',
      to: [to],
      subject: subject,
      html: htmlMessage || `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; color: #333333;">
          <div style="line-height: 1.6; margin-bottom: 30px;">
            ${isHtmlMessage ? message : message.replace(/\n/g, '<br>')}
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            This email was sent from the admin panel.
          </p>
        </div>
      `,
      text: message.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
    });

    if (error) {
      console.error('Individual email error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      recipient: to
    });

  } catch (error) {
    console.error('Individual email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
