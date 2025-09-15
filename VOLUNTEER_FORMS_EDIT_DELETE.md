# Volunteer Forms Edit and Delete Functionality

This document describes the new edit and delete functionality added to the volunteer forms system.

## New Features

### 1. Edit Volunteer Forms

- **Full Form Editing**: Edit title, description, active status, and all questions
- **Partial Updates**: Update only specific fields without affecting others
- **Question Management**: Add, remove, and modify questions with different types
- **Options Handling**: Properly manage multiple choice question options

### 2. Delete Volunteer Forms

- **Safe Deletion**: Confirmation dialog before deletion
- **Cascade Delete**: Automatically removes associated questions and submissions
- **UI Feedback**: Loading states and error handling

## API Endpoints

### PUT `/api/admin/volunteer-forms/[id]`

Updates a volunteer form with new data.

**Request Body:**

```json
{
  "title": "Updated Form Title",
  "description": "Updated description",
  "isActive": true,
  "questions": [
    {
      "question": "What is your name?",
      "type": "TEXT",
      "required": true,
      "order": 0
    },
    {
      "question": "Select your role",
      "type": "MULTIPLE_CHOICE",
      "required": false,
      "options": ["Option 1", "Option 2"],
      "order": 1
    }
  ]
}
```

**Response:**

```json
{
  "id": "form_id",
  "title": "Updated Form Title",
  "description": "Updated description",
  "isActive": true,
  "questions": [...],
  "event": {...}
}
```

### DELETE `/api/admin/volunteer-forms/[id]`

Deletes a volunteer form and all associated data.

**Response:**

```json
{
  "message": "Volunteer form deleted successfully"
}
```

## Service Methods

### `VolunteerService.updateVolunteerForm(id, data)`

- **Full Update**: When `questions` are provided, replaces all existing questions
- **Partial Update**: When `questions` are omitted, only updates form metadata
- **Validation**: Ensures data integrity and proper question ordering

### `VolunteerService.deleteVolunteerForm(id)`

- **Cascade Delete**: Removes form, questions, and submissions
- **Error Handling**: Proper error responses for non-existent forms

## UI Components

### EditVolunteerFormModal

- **Pre-populated Form**: Loads existing form data for editing
- **Question Builder**: Interactive question creation and editing
- **Validation**: Client-side validation before submission
- **Loading States**: Visual feedback during operations

### Updated VolunteerFormsList

- **Edit Button**: Opens edit modal for each form
- **Delete Button**: Confirms and deletes forms
- **Status Toggle**: Quick activate/deactivate functionality
- **Visual Feedback**: Loading states and confirmation dialogs

## Usage Examples

### Editing a Form

1. Navigate to Admin > Volunteers
2. Click "Edit" button on any volunteer form
3. Modify form details and questions as needed
4. Click "Update Form" to save changes

### Deleting a Form

1. Navigate to Admin > Volunteers
2. Click "Delete" button on any volunteer form
3. Confirm deletion in the dialog
4. Form and all associated data will be permanently removed

### API Usage

```typescript
// Update a form
const updatedForm = await fetch(`/api/admin/volunteer-forms/${formId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(updateData),
});

// Delete a form
const result = await fetch(`/api/admin/volunteer-forms/${formId}`, {
  method: "DELETE",
});
```

## Data Handling

### Question Options

- Multiple choice questions store options as JSON strings in the database
- The UI automatically parses and stringifies options as needed
- Empty options arrays are handled gracefully

### Form Validation

- Required fields are validated on both client and server
- Question types are validated against the QuestionType enum
- Order is automatically assigned based on array index

### Error Handling

- Network errors are caught and displayed to users
- Database constraints are respected (e.g., foreign key relationships)
- User-friendly error messages for common scenarios

## Security Considerations

- All endpoints require admin authentication
- Form ownership is validated before operations
- Cascade deletes prevent orphaned data
- Input validation prevents malicious data injection

## Testing

Run the test script to verify functionality:

```bash
npx tsx scripts/test-volunteer-form-edit-delete.ts
```

For delete testing, set the environment variable:

```bash
ALLOW_DELETE_TEST=true npx tsx scripts/test-volunteer-form-edit-delete.ts
```
