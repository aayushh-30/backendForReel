
# MyReels Backend

A robust backend service for the MyReels application, built with Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── index.js                 # Application entry point
├── src/
│   ├── server.js           # Express server configuration
│   ├── controllers/        # Request handlers
│   │   └── auth.controllers.js
│   ├── db/                 # Database configuration
│   │   └── db.connection.js
│   ├── models/            # Database models
│   │   └── user.models.js
│   ├── routes/            # API routes
│   │   ├── auth.routes.js
│   │   └── index.js
│   └── utils/             # Utility functions
│       └── responseTemplates.js
```

## Features Implemented

### Authentication System
- User registration with unique username and email
- Secure password hashing using bcrypt
- JWT-based authentication
- Login functionality with username/email and password
- Logout functionality with cookie clearing

### Data Models

#### User Model
- Username (unique, required)
- Email (unique, required)
- Password (hashed)
- Timestamps for user activity tracking

### Security Features
- Password hashing using bcryptjs
- JWT token generation and validation
- Cookie-based authentication
- Input validation and error handling

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie handling
- **dotenv** - Environment variable management

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=your_port
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes

#### Register User
- **POST** `/api/auth/register`
- **Body:** `{ username, email, password }`
- Creates a new user account

#### Login
- **POST** `/api/auth/login`
- **Body:** `{ username/email, password }`
- Returns JWT token and sets cookie

#### Logout
- **POST** `/api/auth/logout`
- Clears authentication cookie

## Error Handling

The API implements standardized error responses using custom response templates:
- Success Response: `{ success: true, message, data }`
- Error Response: `{ success: false, message, error }`

## Development

Run the server in development mode with hot-reload:
```bash
npm run dev
```

## Dependencies

- express: ^5.1.0
- mongoose: ^8.19.2
- bcryptjs: ^3.0.2
- jsonwebtoken: ^9.0.2
- cookie-parser: ^1.4.7
- dotenv: ^17.2.3
- nodemon: ^3.1.10 (dev dependency)