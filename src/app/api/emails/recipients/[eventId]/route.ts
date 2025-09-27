import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const { eventId } = params;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID is required' },
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

    // Get attendees (registrations)
    const registrations = await prisma.registration.findMany({
      where: { eventId },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        registeredAt: true
      },
      orderBy: { registeredAt: 'desc' }
    });

    const attendees = registrations.map(r => ({
      email: r.email,
      name: `${r.firstName} ${r.lastName}`,
      type: 'attendee',
      registeredAt: r.registeredAt
    }));

    // Get volunteers
    const volunteerSubmissions = await prisma.volunteerSubmission.findMany({
      where: {
        volunteerForm: {
          eventId
        }
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        submittedAt: true
      },
      orderBy: { submittedAt: 'desc' }
    });

    const volunteers = volunteerSubmissions.map(v => ({
      email: v.email,
      name: `${v.firstName} ${v.lastName}`,
      type: 'volunteer',
      registeredAt: v.submittedAt
    }));

    // Combine and remove duplicates (prioritize most recent registration)
    const allRecipients = [...attendees, ...volunteers];
    const uniqueRecipients = allRecipients.reduce((acc, current) => {
      const existing = acc.find(item => item.email === current.email);
      if (!existing) {
        acc.push(current);
      } else if (current.registeredAt > existing.registeredAt) {
        // Replace with more recent registration
        const index = acc.findIndex(item => item.email === current.email);
        acc[index] = {
          ...current,
          type: existing.type === current.type ? current.type : 'both'
        };
      } else if (existing.type !== current.type) {
        // Mark as both if they're both attendee and volunteer
        existing.type = 'both';
      }
      return acc;
    }, [] as typeof allRecipients);

    return NextResponse.json({
      event,
      recipients: {
        attendees: attendees.length,
        volunteers: volunteers.length,
        total: uniqueRecipients.length,
        list: uniqueRecipients.sort((a, b) => b.registeredAt.getTime() - a.registeredAt.getTime())
      }
    });

  } catch (error) {
    console.error('Get recipients error:', error);
    return NextResponse.json(
      { error: 'Failed to get recipients' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
