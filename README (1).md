
# Event Management System Documentation

## Project Overview
The Event Management System is a web-based application designed to facilitate user engagement with events. It features two dashboards:

- User Dashboard: Allows users to view upcoming events and RSVP.
- Admin Dashboard: Enables administrators to create as well as monitor event details such as the number of seats available.

##Features Implemented

### Authentication System
- Sign Up: Users can register with their name, email, and password.
- Sign In: Users can log in using their credentials. The system generates a JSON Web Token (JWT) on signup and reuses the same token during sign-in.
- Role-based Access:
  - Users are redirected to the User Dashboard.
  - Admins are redirected to the Admin Dashboard based on the `is_admin` column in the database.

### User Dashboard
- Displays a list of upcoming events.
- Allows users to RSVP for events.

### Admin Dashboard
- Displays all events with details including the number of seats available.
- Allows administrators to:
  - Create events with the following parameters:
    - Event Name
    - Date
    - Location
    - Description
    - Time

  

## Tools and Technologies Used

### Backend
1. Node.js: Runtime environment for executing JavaScript on the server.
2. Express.js: Web framework for building RESTful APIs.
3. PostgreSQL: Relational database for storing user and event data.
4. JWT (jsonwebtoken): For token-based authentication.
5. bcrypt: For hashing passwords securely.
6. Nodemon: For automatic server restarts during development.

### Frontend
1. HTML: For structuring the web pages.
2. CSS: For styling the application.

### Database Structure
The application uses a PostgreSQL database with the following tables:

#### 1. `usertable`
| Column      | Type    | Description                                   |
|-------------|---------|-----------------------------------------------|
| `user_id`   | SERIAL  | Primary key, unique identifier for each user. |
| `name`      | TEXT    | User's full name.                             |
| `email`     | TEXT    | User's email address.                         |
| `password`  | TEXT    | Hashed password.                              |
| `token`     | TEXT    | JWT token assigned to the user.               |
| `is_admin`  | BOOLEAN | Role of the user (true for admin, false otherwise). |

#### 2. `events`
| Column      | Type      | Description                                  |
|-------------|-----------|----------------------------------------------|
| `event_id`  | SERIAL    | Primary key, unique identifier for each event. |
| `name`      | TEXT      | Name of the event.                           |
| `date`      | DATE      | Scheduled date for the event.                |
| `location`  | TEXT      | Location of the event.                       |
| `description` | TEXT    | Brief description of the event.              |
| `seats`     | INTEGER   | Number of available seats.                   |

### Routes

#### Authentication Routes
- POST `/signup`
  - Registers a new user.
  - Hashes the password and stores it in the database.
  - Generates a JWT token and saves it in the database.

- POST `/signin`
  - Authenticates the user.
  - Checks the credentials against the database.
  - Verifies the password using bcrypt.
  - Redirects users to the appropriate dashboard based on their role.

#### Admin Routes
- GET `/admin/events`: Fetches all events.
- POST `/admin/events`: Creates a new event.


#### User Routes
- GET `/events`: Fetches upcoming events.
- POST `/events/:id/rsvp`: Allows users to RSVP for an event.

## Example Frontend Implementation

### User Dashboard
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>User Dashboard</title>
  <style>
    /* Add CSS styles for a clean layout */
  </style>
</head>
<body>
  <h1>Welcome to the User Dashboard</h1>
  <h2>Upcoming Events</h2>
  <ul id="events-list"></ul>
</body>
<script>
  // Fetch and display events
</script>
</html>
```

### Admin Dashboard
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Admin Dashboard</title>
  <style>
    /* Add CSS styles for a clean layout */
  </style>
</head>
<body>
  <h1>Admin Dashboard</h1>
  <button id="create-event">Create Event</button>
  <h2>All Events</h2>
  <ul id="admin-events-list"></ul>
</body>
<script>
  // Fetch, create, and manage events
</script>
</html>
```

## Deployment

1. Install dependencies:

   npm install
   
2. Set up environment variables:
   - `JWT_SECRET`: Secret key for token generation.
   - `DATABASE_URL`: Connection string for the PostgreSQL database.

3. Run the server:

   nodemon server.js
   

4. **Access the application**:
   - User Dashboard: `http://localhost:3060/user-dashboard`
   - Admin Dashboard: `http://localhost:3060/admin-dashboard`

## Future Improvements
- Implement responsive design for better mobile usability.
- Add email notifications for RSVP confirmations.
- Implement advanced search and filter functionality for events.

This documentation provides an overview of the project, its features, and the tools used, ensuring easy understanding and future scalability.



