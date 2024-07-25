# Fitness Tracker

## Overview

The Fitness Tracker is a web application designed to help users log and track their workouts. It provides features to add, view, update, and delete workouts, as well as visualize workout data through charts.

## Features

- User authentication (login, signup, password reset)
- Add new workouts with details such as type, speed, effort, duration, and calories burned
- View a list of logged workouts
- Update existing workouts
- Delete workouts with confirmation
- Visualize workout data through charts

## Technologies Used

- Frontend: React, Next.js
- Backend: Node.js, Express
- Database: Prisma
- Styling: Tailwind CSS
- State Management: React Context
- Form Handling: React Hook Form, Zod
- UI Components: Custom components using Tailwind and Shadcn UI

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/fitness-tracker.git
   cd fitness-tracker
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

### Configuration

1. Create a `.env` file in the root directory and add your environment variables:

   ```sh
   DATABASE_URL=your-database-url
   JWT_SECRET=your-jwt-secret
   ```

### Running the Application

1. Start the backend server:

   ```sh
   cd server
   npm run dev
   # or
   yarn dev
   ```

2. Start the frontend development server:

   ```sh
   cd ..
   npm run dev
   # or
   yarn dev
   ```

### Building for Production

1. Build the frontend application:

   ```sh
   npm run build
   # or
   yarn build
   ```

2. Start the production server:

   ```sh
   npm start
   # or
   yarn start
   ```

### API Endpoints

- `POST /auth/login`: Login a user
- `POST /auth/signup`: Register a new user
- `POST /auth/forgot-password`: Initiate password reset
- `POST /auth/reset-password`: Reset password
- `GET /workouts`: Get all workouts for the authenticated user
- `POST /workouts`: Create a new workout
- `PUT /workouts/:id`: Update a workout
- `DELETE /workouts/:id`: Delete a workout

## Usage

### Adding a Workout

1. Navigate to the Add Workout section.
2. Select a workout type, and optionally enter speed, effort, and duration.
3. Click "Save Workout" to log your workout.

### Viewing Workouts

1. The logged workouts will be displayed in the Workout List section.
2. You can see the details of each workout, such as type, date, calories burned, speed, effort, and duration.

### Deleting a Workout

1. Click the "Delete" button on the workout card you want to remove.
2. Confirm the deletion in the dialog that appears.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this `README.md` to better fit your project and its unique setup and features.
