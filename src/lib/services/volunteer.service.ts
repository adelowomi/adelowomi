import { prisma } from "@/lib/utils/db";
import { QuestionType } from "@prisma/client";

export interface VolunteerFormQuestion {
  id?: string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
  order: number;
}

export interface CreateVolunteerFormData {
  eventId: string;
  title: string;
  description?: string;
  questions: VolunteerFormQuestion[];
}

export interface UpdateVolunteerFormData {
  title?: string;
  description?: string;
  questions?: VolunteerFormQuestion[];
  isActive?: boolean;
}

export interface VolunteerSubmissionData {
  volunteerFormId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  answers: {
    questionId: string;
    answer: string;
  }[];
}

export class VolunteerService {
  static async createVolunteerForm(data: CreateVolunteerFormData) {
    return await prisma.volunteerForm.create({
      data: {
        eventId: data.eventId,
        title: data.title,
        description: data.description,
        questions: {
          create: data.questions.map((q, index) => ({
            question: q.question,
            type: q.type,
            required: q.required,
            options: q.options ? JSON.stringify(q.options) : null,
            order: index,
          })),
        },
      },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
        event: true,
      },
    });
  }

  static async getVolunteerFormsByEvent(eventId: string) {
    return await prisma.volunteerForm.findMany({
      where: { eventId },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getVolunteerForm(id: string) {
    return await prisma.volunteerForm.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
        event: true,
      },
    });
  }

  static async getVolunteerFormSubmissions(volunteerFormId: string) {
    return await prisma.volunteerSubmission.findMany({
      where: { volunteerFormId },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });
  }

  static async submitVolunteerForm(data: VolunteerSubmissionData) {
    return await prisma.volunteerSubmission.create({
      data: {
        volunteerFormId: data.volunteerFormId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        answers: {
          create: data.answers.map((answer) => ({
            questionId: answer.questionId,
            answer: answer.answer,
          })),
        },
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });
  }

  static async updateVolunteerFormStatus(id: string, isActive: boolean) {
    return await prisma.volunteerForm.update({
      where: { id },
      data: { isActive },
    });
  }

  static async updateVolunteerForm(id: string, data: UpdateVolunteerFormData) {
    // If questions are being updated, we need to handle them separately
    if (data.questions) {
      // Delete existing questions and create new ones
      await prisma.volunteerFormQuestion.deleteMany({
        where: { volunteerFormId: id },
      });

      return await prisma.volunteerForm.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          isActive: data.isActive,
          questions: {
            create: data.questions.map((q, index) => ({
              question: q.question,
              type: q.type,
              required: q.required,
              options: q.options ? JSON.stringify(q.options) : null,
              order: index,
            })),
          },
        },
        include: {
          questions: {
            orderBy: { order: "asc" },
          },
          event: true,
        },
      });
    } else {
      // Update only form metadata
      return await prisma.volunteerForm.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          isActive: data.isActive,
        },
        include: {
          questions: {
            orderBy: { order: "asc" },
          },
          event: true,
        },
      });
    }
  }

  static async deleteVolunteerForm(id: string) {
    return await prisma.volunteerForm.delete({
      where: { id },
    });
  }

  static async getAllVolunteerForms() {
    return await prisma.volunteerForm.findMany({
      include: {
        event: true,
        questions: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: { submissions: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }
}
