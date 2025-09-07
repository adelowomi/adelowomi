# Volunteer Forms Feature Guide

## Overview

The volunteer forms feature allows administrators to create custom volunteer application forms for events and manage volunteer submissions.

## Features

### Admin Features

1. **Create Volunteer Forms**: Admins can create custom forms for specific events
2. **Question Types**: Support for multiple question types:
   - Text input
   - Textarea (long text)
   - Email
   - Phone
   - Multiple choice (radio buttons)
   - Checkbox (multiple selections)
   - Date picker
   - Time picker
3. **Form Management**: Activate/deactivate forms
4. **View Submissions**: See all volunteer applications with detailed responses

### Public Features

1. **Volunteer Application**: Public form for volunteers to apply
2. **Form Validation**: Required field validation
3. **Success Confirmation**: Confirmation page after successful submission

## Database Schema

### New Tables Added

- `VolunteerForm`: Main form configuration
- `VolunteerFormQuestion`: Individual questions in forms
- `VolunteerSubmission`: Volunteer applications
- `VolunteerAnswer`: Individual answers to questions

## API Endpoints

### Admin Endpoints

- `GET /api/admin/volunteer-forms` - List all volunteer forms
- `POST /api/admin/volunteer-forms` - Create new volunteer form
- `GET /api/admin/volunteer-forms/[id]` - Get specific form
- `PATCH /api/admin/volunteer-forms/[id]` - Update form status
- `DELETE /api/admin/volunteer-forms/[id]` - Delete form
- `GET /api/admin/volunteer-forms/[id]/submissions` - Get form submissions

### Public Endpoints

- `POST /api/volunteer-forms/[id]/submit` - Submit volunteer application

## Admin Interface

### Navigation

- New "Volunteers" section added to admin sidebar
- Access via `/admin/volunteers`

### Volunteer Forms List

- Shows all created forms with event information
- Displays submission count for each form
- Toggle form active/inactive status
- View submissions button

### Create Form Modal

- Select event from dropdown
- Add form title and description
- Add multiple questions with different types
- Set required/optional for each question
- Add options for multiple choice questions

### Submissions View

- List all submissions for a specific form
- View volunteer contact information
- See all question responses
- Organized by submission date

## Public Volunteer Form

### Form Structure

- Event information display
- Volunteer contact fields (name, email, phone)
- Custom questions as configured by admin
- Form validation and error handling
- Success confirmation page

### URL Pattern

- Public forms accessible at `/volunteer/[formId]`
- Forms must be active to accept submissions
- Duplicate email submissions prevented per form

## Usage Examples

### Creating a Volunteer Form

1. Go to Admin → Volunteers
2. Click "Create Volunteer Form"
3. Select an event
4. Add form title and description
5. Add questions:
   - "What is your experience?" (Textarea, Required)
   - "Preferred volunteer area?" (Multiple Choice, Required)
   - "Available full duration?" (Multiple Choice, Required)
   - "Additional comments?" (Textarea, Optional)
6. Save form

### Managing Submissions

1. Go to Admin → Volunteers
2. Click "View Submissions" on any form
3. Review volunteer applications
4. Contact volunteers directly using provided information

## Technical Implementation

### Key Components

- `VolunteerService`: Backend service for database operations
- `VolunteerFormsList`: Admin list component
- `CreateVolunteerFormModal`: Form creation interface
- `VolunteerSubmissionsPage`: Submissions management
- `VolunteerFormPage`: Public application form

### Question Type Handling

Each question type renders appropriate input:

- TEXT/EMAIL/PHONE: Standard input fields
- TEXTAREA: Multi-line text area
- MULTIPLE_CHOICE: Radio button group
- CHECKBOX: Checkbox group with comma-separated values
- DATE/TIME: Specialized input types

### Data Validation

- Required field validation on frontend and backend
- Email format validation
- Unique email per form constraint
- Question order preservation

## Future Enhancements

- Email notifications for new submissions
- Export submissions to CSV/Excel
- Form templates for common volunteer roles
- Conditional questions based on previous answers
- File upload support for volunteer documents
- Integration with calendar for availability scheduling

## Testing

Run the test script to verify functionality:

```bash
npx tsx scripts/test-volunteer-forms.ts
```

This creates a sample form with questions and a test submission to verify the database schema and basic operations work correctly.
