# AI Course Generator

hello Everone!! This repository contains the source code for an AI-powered course generator application. Users can input their data, preview the course structure in real-time, and generate professional course outlines. The application features AI-generated summaries, data storage and management through Neon Postgres, and an integrated AI chatbot for assistance.

## Live Site
You can access the live application [here](#).

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Interactive Form Section**: Users can fill in their personal, educational, and professional details in an intuitive form.
- **Live Preview**: A real-time preview of the course is displayed as users input their data.
- **AI-Powered Summary Generator**: Integrated AI generates a professional summary for the user’s course based on the provided information.
- **Course Management**: Users can download, share, delete, or edit their courses at any time.
- **Data Storage**: User data is securely stored in Neon Postgres, ensuring seamless access and management.
- **Strapi Backend**: The application uses Strapi to connect the frontend with the Neon Postgres database.
- **AI Chatbot**: An AI chatbot powered by Gemini is available to assist users with any questions or guidance.

## Technologies Used
### Frontend:
- React.js
- Next.js
- Html
- Tailwind CSS
- Shadcn UI components

### Backend:
- Clerk for authentication and authorization
- Drizzle for Postgres
- Gemini API for natural language processing

### Other:
- Next.js for routing
- React Icons for UI elements

## Getting Started
### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Neon Postgres account
- Drizzle connected to Neon Postgres

### Steps to Set Up the Project
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/adarshpheonix2810/Ai-Course-Generator.git
   cd Ai-Course-Generator
   ```
2. **Install Dependencies**: Run the following command to install all the required dependencies:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**: Create a `.env.local` file in the root directory and add the following:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=ck_live_1234567890
   CLERK_SECRET_KEY=sk_live_1234567890
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_DB_CONNECTION_STRING=postgresql://username:password@host:port/database?sslmode=require
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-api-key
   NEXT_PUBLIC_HOST_NAME=http://localhost:3000
   ```
   Replace the placeholders with your actual credentials.
4. **Run the Development Server**: Start the application in development mode:
   ```bash
   npm run dev
   ```
   The application will be accessible at [http://localhost:5173](http://localhost:5173).
5. **Build for Production**: To create an optimized production build:
   ```bash
   npm run build
   ```
6. **Preview Production Build**: To preview the production build locally:
   ```bash
   npm run preview
   ```

### Backend Setup
1. **Set Up Strapi**:
   - Install and configure [Drizzle](https://drizzle-orm.com/docs/installation).
   - Connect it to your Neon Postgres database.
   - Create the necessary APIs and endpoints to handle user data.
2. **Deploy Strapi**: Deploy Strapi on a platform of your choice (e.g., Heroku, Vercel, or your own server).

### Additional Configuration
- **AI Chatbot**: Ensure the Gemini API is correctly integrated by providing your API key in the .env file.
- **Payment Gateways**: Set up Razorpay and PayPal with the provided API keys in the .env file.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project’s coding standards.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
