// Event Status Enum
export enum EventStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  COMPLETED = "COMPLETED",
}

// Student Status Enum
export enum StudentStatus {
  STUDENT = "STUDENT",
  GRADUATE = "GRADUATE",
}

// Video Category Enum
export enum VideoCategory {
  EVENT = "EVENT",
  CONTENT = "CONTENT",
  PROMOTIONAL = "PROMOTIONAL",
}

// Event Interface
export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  venue: string;
  capacity: number;
  flyerUrl?: string;
  status: EventStatus;
  createdAt: Date;
  updatedAt: Date;
  registrationCount?: number;
  availableSpots?: number;
}

// Event Creation/Update Input
export interface EventInput {
  title: string;
  description?: string;
  date: string; // ISO string for API
  time: string;
  venue: string;
  capacity: number;
  flyerUrl?: string;
  status?: EventStatus;
}

// Registration Interface
export interface Registration {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: StudentStatus;
  course?: string;
  areaOfInterest: string;
  expectations?: string;
  registeredAt: Date;
  event?: Event;
}

// Registration Input
export interface RegistrationInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: StudentStatus;
  course?: string;
  areaOfInterest: string;
  expectations?: string;
}

// Gallery Image Interface
export interface GalleryImage {
  id: string;
  eventId?: string;
  title: string;
  driveFileId: string;
  driveUrl: string;
  thumbnailUrl?: string;
  createdAt: Date;
  event?: Event;
}

// Gallery Image Input
export interface GalleryImageInput {
  eventId?: string;
  title: string;
  file: File | Buffer;
}

// Video Interface
export interface Video {
  id: string;
  eventId?: string;
  title: string;
  description?: string;
  driveFileId: string;
  driveUrl: string;
  thumbnailUrl?: string;
  category: VideoCategory;
  createdAt: Date;
  event?: Event;
}

// Video Input
export interface VideoInput {
  eventId?: string;
  title: string;
  description?: string;
  category: VideoCategory;
  file: File | Buffer;
}

// Dashboard Statistics
export interface DashboardStats {
  totalEvents: number;
  activeEvents: number;
  totalRegistrations: number;
  totalImages: number;
  totalVideos: number;
  recentRegistrations: Registration[];
  upcomingEvents: Event[];
}

// Event Search and Filter
export interface EventFilters {
  status?: EventStatus;
  dateFrom?: string;
  dateTo?: string;
  venue?: string;
}

// Registration Export Data
export interface RegistrationExport {
  eventTitle: string;
  eventDate: string;
  registrations: Registration[];
  totalCount: number;
  exportedAt: Date;
}
