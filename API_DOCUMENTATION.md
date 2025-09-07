# Admin API Documentation

This document provides comprehensive documentation for all admin APIs that support the admin dashboard.

## Authentication

All admin APIs require authentication with admin role. Include credentials in requests:

```javascript
fetch("/api/admin/endpoint", {
  credentials: "include",
  // ... other options
});
```

## Response Format

All APIs follow a consistent response format:

### Success Response

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "timestamp": "2025-01-09T12:00:00.000Z",
  "pagination": {
    /* optional pagination info */
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {
      /* optional error details */
    }
  },
  "timestamp": "2025-01-09T12:00:00.000Z"
}
```

## Dashboard APIs

### Get Dashboard Statistics

Get comprehensive dashboard statistics including events, registrations, and media counts.

**Endpoint:** `GET /api/admin/dashboard/stats`

**Response:**

```json
{
  "success": true,
  "data": {
    "events": {
      "total": 25,
      "active": 5,
      "completed": 18,
      "inactive": 2
    },
    "registrations": {
      "total": 450,
      "thisMonth": 45,
      "thisWeek": 12
    },
    "media": {
      "totalImages": 120,
      "totalVideos": 35,
      "recentUploads": 8
    },
    "recentActivity": {
      "recentEvents": [...],
      "recentRegistrations": [...]
    }
  }
}
```

## Events APIs

### List All Events

Get paginated list of all events with admin details.

**Endpoint:** `GET /api/admin/events`

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10, max: 100) - Items per page
- `status` (string) - Filter by status: ACTIVE, INACTIVE, COMPLETED
- `search` (string) - Search in title, description, venue
- `sortBy` (string, default: date) - Sort field: date, title, createdAt, capacity
- `sortOrder` (string, default: asc) - Sort order: asc, desc

**Example:**

```
GET /api/admin/events?page=1&limit=20&status=ACTIVE&search=workshop
```

### Create Event

Create a new event.

**Endpoint:** `POST /api/admin/events`

**Request Body:**

```json
{
  "title": "Tech Workshop 2025",
  "description": "Advanced web development workshop",
  "date": "2025-02-15T18:00:00.000Z",
  "time": "18:00",
  "venue": "Tech Hub Conference Room",
  "capacity": 50,
  "flyerUrl": "https://example.com/flyer.jpg",
  "status": "ACTIVE"
}
```

### Get Single Event

Get detailed information about a specific event.

**Endpoint:** `GET /api/admin/events/{id}`

### Update Event

Update an existing event.

**Endpoint:** `PUT /api/admin/events/{id}`

**Request Body:** Same as create event, but all fields are optional.

### Delete Event

Delete an event and all associated registrations.

**Endpoint:** `DELETE /api/admin/events/{id}`

### Get Event Registrations

Get registrations for a specific event.

**Endpoint:** `GET /api/admin/events/{id}/registrations`

**Query Parameters:** Same as general registrations list.

## Registrations APIs

### List All Registrations

Get paginated list of all registrations across all events.

**Endpoint:** `GET /api/admin/registrations`

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10, max: 100) - Items per page
- `status` (string) - Filter by student status: STUDENT, GRADUATE
- `search` (string) - Search in name, email, course, area of interest
- `sortBy` (string, default: registeredAt) - Sort field
- `sortOrder` (string, default: desc) - Sort order

### Export Registrations

Export registrations for a specific event.

**Endpoint:** `POST /api/admin/registrations/export`

**Request Body:**

```json
{
  "eventId": "event_id_here",
  "format": "csv",
  "fields": ["firstName", "lastName", "email", "phone", "registeredAt"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "eventTitle": "Tech Workshop 2025",
    "eventDate": "2025-02-15T18:00:00.000Z",
    "registrations": [...],
    "totalCount": 45,
    "exportedAt": "2025-01-09T12:00:00.000Z"
  }
}
```

## Gallery APIs

### List Gallery Images

Get paginated list of all gallery images.

**Endpoint:** `GET /api/admin/gallery`

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10, max: 100) - Items per page
- `eventId` (string) - Filter by event
- `search` (string) - Search in title

### Upload Gallery Image

Upload a new image to the gallery.

**Endpoint:** `POST /api/admin/gallery`

**Request:** Multipart form data

- `file` (File) - Image file
- `title` (string) - Image title
- `eventId` (string, optional) - Associated event ID
- `description` (string, optional) - Image description

### Get Single Gallery Image

Get detailed information about a specific gallery image.

**Endpoint:** `GET /api/admin/gallery/{id}`

### Update Gallery Image

Update gallery image metadata.

**Endpoint:** `PUT /api/admin/gallery/{id}`

**Request Body:**

```json
{
  "title": "Updated title",
  "eventId": "new_event_id",
  "description": "Updated description"
}
```

### Delete Gallery Image

Delete a gallery image and its file from Google Drive.

**Endpoint:** `DELETE /api/admin/gallery/{id}`

## Videos APIs

### List Videos

Get paginated list of all videos.

**Endpoint:** `GET /api/admin/videos`

**Query Parameters:**

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10, max: 100) - Items per page
- `category` (string) - Filter by category: EVENT, CONTENT, PROMOTIONAL
- `eventId` (string) - Filter by event
- `search` (string) - Search in title, description

### Upload Video

Upload a new video.

**Endpoint:** `POST /api/admin/videos`

**Request:** Multipart form data

- `file` (File) - Video file
- `title` (string) - Video title
- `description` (string, optional) - Video description
- `eventId` (string, optional) - Associated event ID
- `category` (string, default: EVENT) - Video category

### Get Single Video

Get detailed information about a specific video.

**Endpoint:** `GET /api/admin/videos/{id}`

### Update Video

Update video metadata.

**Endpoint:** `PUT /api/admin/videos/{id}`

**Request Body:**

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "category": "CONTENT",
  "eventId": "new_event_id"
}
```

### Delete Video

Delete a video and its file from Google Drive.

**Endpoint:** `DELETE /api/admin/videos/{id}`

## Error Codes

- `VALIDATION_ERROR` - Request validation failed
- `NOT_FOUND` - Resource not found
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `DUPLICATE_REGISTRATION` - User already registered
- `CAPACITY_EXCEEDED` - Event at full capacity
- `DATABASE_ERROR` - Database operation failed
- `DRIVE_ERROR` - Google Drive operation failed
- `INTERNAL_ERROR` - Internal server error

## Usage Examples

### React Hook Integration

```typescript
import { useAdminEvents, useAdminRegistrations } from "@/hooks/useAdmin";

function AdminDashboard() {
  const { events, loading, createEvent } = useAdminEvents();
  const { registrations, exportRegistrations } = useAdminRegistrations();

  const handleCreateEvent = async (eventData) => {
    try {
      await createEvent(eventData);
      // Event created successfully
    } catch (error) {
      // Handle error
    }
  };

  const handleExportRegistrations = async (eventId) => {
    try {
      const exportData = await exportRegistrations(eventId, "csv");
      // Process export data
    } catch (error) {
      // Handle error
    }
  };

  // Component JSX...
}
```

### Direct API Calls

```typescript
// Create event
const response = await fetch("/api/admin/events", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    title: "New Event",
    date: "2025-02-15T18:00:00.000Z",
    time: "18:00",
    venue: "Conference Room",
    capacity: 100,
  }),
});

const result = await response.json();
if (result.success) {
  console.log("Event created:", result.data);
} else {
  console.error("Error:", result.error.message);
}
```

## Rate Limiting

Currently, no rate limiting is implemented, but it's recommended to:

- Implement reasonable delays between requests
- Use pagination for large datasets
- Cache responses when appropriate

## Security Considerations

- All admin APIs require authentication
- File uploads are validated for type and size
- SQL injection protection via Prisma ORM
- Input validation via Zod schemas
- CORS configured for same-origin requests only
