# Event Registration Deletion Guide

This guide explains how to delete event registration entries in the system.

## Overview

The system now supports deleting individual event registration entries through both the admin interface and API endpoints. This functionality is restricted to admin users only.

## API Endpoints

### Delete Registration

- **Endpoint**: `DELETE /api/admin/registrations/[id]`
- **Authentication**: Admin access required
- **Description**: Deletes a specific registration by ID

#### Request

```http
DELETE /api/admin/registrations/cm123abc456def789
Content-Type: application/json
```

#### Response (Success - 200)

```json
{
  "success": true,
  "data": {
    "message": "Registration deleted successfully",
    "deletedRegistration": {
      "id": "cm123abc456def789",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "eventTitle": "Tech Conference 2025"
    }
  }
}
```

#### Response (Not Found - 404)

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Registration not found"
  }
}
```

### Get Registration

- **Endpoint**: `GET /api/admin/registrations/[id]`
- **Authentication**: Admin access required
- **Description**: Retrieves a specific registration by ID (useful for verification before deletion)

## Frontend Components

### Admin Registrations Page

The admin registrations page (`/admin/events/registrants`) now includes:

- **Delete Button**: Each registration row has a delete button (trash icon)
- **Confirmation Modal**: Clicking delete shows a confirmation dialog
- **Real-time Updates**: The list refreshes automatically after deletion
- **Loading States**: Shows loading indicators during deletion

### Reusable Delete Component

A reusable `DeleteRegistrationButton` component is available:

```tsx
import DeleteRegistrationButton from '@/components/ui/DeleteRegistrationButton'

// Icon variant (default)
<DeleteRegistrationButton
  registrationId="cm123abc456def789"
  registrationName="John Doe"
  onDeleted={() => console.log('Registration deleted')}
/>

// Button variant
<DeleteRegistrationButton
  registrationId="cm123abc456def789"
  variant="button"
  size="lg"
  onDeleted={handleRefresh}
/>
```

## Hooks

### useRegistration Hook

The `useRegistration` hook now includes a `deleteRegistration` method:

```tsx
import { useRegistration } from "@/hooks/useRegistration";

const { deleteRegistration, loading, error } = useRegistration();

const handleDelete = async (registrationId: string) => {
  try {
    await deleteRegistration(registrationId);
    console.log("Registration deleted successfully");
  } catch (error) {
    console.error("Failed to delete registration:", error);
  }
};
```

### useAdminRegistrations Hook

The admin hook includes delete functionality with automatic state updates:

```tsx
import { useAdminRegistrations } from "@/hooks/useAdmin";

const { registrations, deleteRegistration, refetch } = useAdminRegistrations();

const handleDelete = async (registrationId: string) => {
  try {
    await deleteRegistration(registrationId); // Automatically updates local state
  } catch (error) {
    console.error("Failed to delete registration:", error);
  }
};
```

## Security & Validation

### Authentication

- All delete operations require admin authentication
- Unauthorized requests return 401 status

### Input Validation

- Registration IDs are validated using Zod schema
- Invalid ID formats return 400 status with validation errors

### Data Integrity

- Deletion uses Prisma's cascade delete to maintain referential integrity
- The registration is verified to exist before deletion

## Testing

### Manual Testing

1. Navigate to `/admin/events/registrants`
2. Click the delete button (trash icon) on any registration
3. Confirm deletion in the modal
4. Verify the registration is removed from the list

### Automated Testing

Run the test script to verify API functionality:

```bash
npm run test:registration-delete
```

The test script verifies:

- ✅ Registration retrieval before deletion
- ✅ Successful deletion
- ✅ Verification that registration is deleted
- ✅ Proper handling of non-existent registrations
- ✅ Input validation for invalid ID formats

## Error Handling

### Common Error Scenarios

1. **Registration Not Found**: Returns 404 with appropriate message
2. **Invalid ID Format**: Returns 400 with validation errors
3. **Unauthorized Access**: Returns 401 for non-admin users
4. **Database Errors**: Returns 500 with generic error message

### Frontend Error Handling

- Loading states during deletion
- Error messages displayed to users
- Automatic retry suggestions
- Graceful fallbacks for network issues

## Database Impact

### Cascade Behavior

When a registration is deleted:

- The registration record is permanently removed
- Related event capacity is automatically updated
- No orphaned records are left behind

### Performance Considerations

- Deletion operations are atomic
- Minimal database queries required
- Efficient indexing on registration IDs

## Best Practices

### For Developers

1. Always show confirmation before deletion
2. Provide clear feedback during the process
3. Handle errors gracefully with user-friendly messages
4. Update UI state immediately after successful deletion

### For Administrators

1. Double-check registration details before deletion
2. Consider exporting data before bulk deletions
3. Monitor deletion logs for audit purposes
4. Use the confirmation modal to prevent accidental deletions

## Future Enhancements

Potential improvements to consider:

- Bulk deletion functionality
- Soft delete with recovery option
- Deletion audit logs
- Email notifications to registrants
- Undo functionality within a time window

## Troubleshooting

### Common Issues

1. **Delete button not working**: Check admin authentication
2. **404 errors**: Verify registration ID is correct
3. **Permission denied**: Ensure user has admin role
4. **UI not updating**: Check network connection and refresh page

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify API responses in Network tab
3. Confirm database state using Prisma Studio
4. Run the test script to verify API functionality
