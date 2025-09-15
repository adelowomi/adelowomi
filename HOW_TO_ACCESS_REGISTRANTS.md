# How to Access the Registrants Page

## 🎯 Quick Access

The registrants page is now accessible in multiple ways:

### 1. Direct URL

Navigate directly to: **`http://localhost:3000/admin/events/registrants`**

### 2. From Admin Events Page

1. Go to **`http://localhost:3000/admin/events`**
2. Click the **"View All Registrants"** button in the top-right corner

### 3. From Individual Event View

1. Go to **`http://localhost:3000/admin/events`**
2. Click **"View"** on any event card
3. In the event details modal, click **"View All Registrants"** button

## 🔧 Setup Steps

### 1. Start Development Server

```bash
npm run dev
```

### 2. Create Test Data (Optional)

If you don't have any registrations yet, create some test data:

```bash
npm run create:test-registrations
```

This will create:

- 1 test event
- 5 sample registrations with different student statuses and courses

### 3. Access Admin Panel

- Navigate to `http://localhost:3000/admin/events`
- You should see the "View All Registrants" button

## 🎨 What You'll See

The registrants page includes:

### Header Row

- Name | Email | Phone | Status | Course | Area of Interest | Event | Actions

### Registration Rows

- Each registration displays all relevant information
- **Delete button** (trash icon) in the Actions column
- Hover effects and proper styling

### Delete Functionality

- Click the trash icon to delete a registration
- Confirmation modal appears
- "Are you sure?" dialog prevents accidental deletions
- Loading states during deletion
- Automatic list refresh after deletion

### Pagination

- Shows "X out of Y" registrations
- Previous/Next buttons for navigation
- Handles empty states gracefully

## 🔒 Authentication

The registrants page requires admin authentication. If you see a login page:

1. Make sure you have admin credentials set up
2. Check your authentication setup
3. Ensure you're logged in as an admin user

## 🐛 Troubleshooting

### "No registrations found"

- Run `npm run create:test-registrations` to create sample data
- Check if you have any events with registrations in your database

### Page not loading

- Ensure development server is running (`npm run dev`)
- Check browser console for JavaScript errors
- Verify the URL is correct: `/admin/events/registrants`

### Delete not working

- Check browser console for errors
- Ensure you have admin permissions
- Verify the API endpoints are working

### Styling issues

- Clear browser cache
- Check if Tailwind CSS is properly loaded
- Verify all component imports are correct

## 📱 Mobile Responsive

The registrants page is fully responsive:

- Mobile: Stacked layout with horizontal scrolling for table
- Tablet: Optimized column widths
- Desktop: Full table layout with all columns visible

## 🎉 Success!

Once you can access the page, you should see:

- ✅ List of all registrations across all events
- ✅ Delete functionality with confirmation
- ✅ Proper loading and error states
- ✅ Responsive design
- ✅ Real-time updates after actions

The registration deletion functionality is now fully implemented and accessible!
