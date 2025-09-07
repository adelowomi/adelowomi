# API Integration Guide

This document outlines how the frontend UI components have been integrated with the backend APIs.

## Overview

The integration includes:

- Event management (listing, registration, details)
- Gallery integration (images from events)
- Video management
- Admin dashboard functionality
- Real-time data fetching with custom hooks

## Key Components Updated

### 1. Event Management

#### Components:

- `src/components/Home/Events.tsx` - Shows upcoming events on homepage
- `src/components/Event/EventHero.tsx` - Event details page hero
- `src/components/Event/EventsList.tsx` - Full events listing page
- `src/components/Event/RegisterEventForm.tsx` - Event registration form

#### Features:

- Fetches real event data from `/api/events`
- Shows event capacity and available spots
- Dynamic countdown timer for registration deadline
- Form validation and error handling
- Success/error states for registration

### 2. Custom Hooks

#### `src/hooks/useEvents.ts`

- `useEvents()` - Fetch paginated events with filtering
- `useEvent(id)` - Fetch single event details
- `useUpcomingEvents()` - Fetch upcoming events only

#### `src/hooks/useRegistration.ts`

- `useRegistration()` - Handle event registration with validation

#### `src/hooks/useGallery.ts`

- `useGallery()` - Fetch gallery images (all or by event)
- `useVideos()` - Fetch videos by category

#### `src/hooks/useAdmin.ts`

- `useDashboardStats()` - Admin dashboard statistics
- `useAdminEvents()` - Admin event management

### 3. Gallery Integration

#### Components:

- `src/components/Event/Gallery.tsx` - Gallery preview on event page
- `src/components/Gallery/GalleryGrid.tsx` - Full gallery page

#### Features:

- Displays real images from Google Drive
- Event-specific image filtering
- Responsive grid layout
- Image hover effects and metadata

### 4. Dynamic Routing

#### New Routes:

- `/event/[id]/register` - Dynamic event registration
- `/gallery` - Full gallery page
- `/event/success` - Registration success page

#### Route Handling:

- Dynamic event ID routing for registration
- Fallback redirect for old `/event/register-event` route
- Error handling for invalid event IDs

## API Endpoints Used

### Public Endpoints:

- `GET /api/events` - List events with pagination and filtering
- `GET /api/events/[id]` - Get single event details
- `POST /api/events/[id]/register` - Register for event
- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/event/[eventId]` - Get event-specific images
- `GET /api/videos` - Get all videos
- `GET /api/videos/category/[category]` - Get videos by category

### Admin Endpoints:

- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/events` - Admin event management
- `POST /api/admin/events` - Create new event
- `PUT /api/admin/events/[id]` - Update event
- `DELETE /api/admin/events/[id]` - Delete event

## Key Features Implemented

### 1. Real-time Data

- Events show live registration counts
- Available spots update dynamically
- Countdown timers for registration deadlines

### 2. Form Validation

- Client-side validation for registration forms
- Server-side error handling and display
- Success states and redirects

### 3. Error Handling

- Graceful error states for API failures
- Loading states during data fetching
- Fallback content for empty states

### 4. Responsive Design

- Mobile-friendly event cards
- Responsive gallery grid
- Adaptive form layouts

### 5. Performance Optimizations

- Image optimization with Next.js Image component
- Pagination for large datasets
- Efficient re-fetching strategies

## Usage Examples

### Fetching Events:

```typescript
const { events, loading, error } = useEvents({
  page: 1,
  limit: 10,
  status: "ACTIVE",
});
```

### Event Registration:

```typescript
const { registerForEvent, loading, error, success } = useRegistration();

const handleSubmit = async (formData) => {
  await registerForEvent(eventId, formData);
};
```

### Gallery Integration:

```typescript
const { images, loading, error } = useGallery({
  eventId: "optional-event-id",
  limit: 12,
});
```

## Next Steps

1. **Admin Dashboard**: Complete admin UI components for event management
2. **Authentication**: Integrate NextAuth.js for admin login
3. **File Uploads**: Add image/video upload functionality
4. **Real-time Updates**: Consider WebSocket integration for live updates
5. **Analytics**: Add event analytics and reporting
6. **Email Integration**: Implement email confirmations for registrations

## Testing

To test the integration:

1. Start the development server: `npm run dev`
2. Visit `/event` to see the events listing
3. Click on an event to register
4. Visit `/gallery` to see the gallery integration
5. Check the browser console for any API errors

The integration provides a solid foundation for the event management system with room for future enhancements.
