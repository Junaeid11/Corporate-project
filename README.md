# Corporate Website

A modern, responsive corporate website built with Next.js frontend and Node.js/MongoDB backend. Features dynamic content management, JWT authentication, and a professional admin dashboard.

## 🚀 Features

### Frontend (Next.js 15 + TypeScript)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Dynamic Content**: Hero section, services, and contact form with backend integration
- **Authentication**: JWT-based login/register system with protected routes
- **Admin Dashboard**: Content management for hero section, services, and contact submissions
- **Interactive Components**: 
  - Animated hero section with floating icons
  - Embedded Google Maps
  - WhatsApp chat button
  - Professional navigation
- **Responsive Design**: Mobile-first approach with modern animations

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations for all content
- **JWT Authentication**: Secure token-based authentication
- **MongoDB Integration**: Mongoose ODM for data modeling
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Secure environment variable management

## 📁 Project Structure

```
task-Corporate/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── admin/       # Admin dashboard pages
│   │   │   ├── auth/        # Authentication pages
│   │   │   └── contact/     # Contact page
│   │   ├── components/      # Reusable React components
│   │   └── utils/           # Utility functions and contexts
│   ├── public/              # Static assets
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware (auth, etc.)
│   ├── models/              # MongoDB/Mongoose models
│   ├── routes/              # API route definitions
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **CORS**: Cross-origin resource sharing
- **Environment**: dotenv for configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-Corporate
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   Create `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

5. **Start Development Servers**

   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📋 Available Scripts

### Frontend
```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run start    # Start production server
npm run build    # Build script (placeholder)
```

## 🔐 Authentication

### User Registration
- Users can register with email and password
- JWT tokens are generated for authentication
- Protected routes require valid JWT tokens

## 🎨 Features Overview

### Home Page
- **Dynamic Hero Section**: Editable content with animations
- **Services Section**: CRUD operations for service offerings
- **Google Maps Integration**: Embedded location map
- **WhatsApp Chat**: Direct messaging integration

### Admin Dashboard
- **Content Management**: Edit hero section and services
- **Contact Management**: View and manage contact submissions
- **User Management**: Register new users
- **Responsive Design**: Works on desktop and mobile

### Contact Page
- **Contact Form**: User-friendly form with validation
- **Data Storage**: Submissions stored in MongoDB
- **Admin View**: Dashboard section to view all contacts

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Hero Section
- `GET /api/hero` - Get hero content
- `PUT /api/hero/:id` - Update hero content

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin only)

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Vercel)
1. Configure `vercel.json` for serverless deployment
2. Set environment variables in Vercel dashboard
3. Deploy API routes

### Database
- Use MongoDB Atlas for cloud database
- Configure connection string in environment variables



## 📝 License

This project made by Junaeid Ahmed Tanim.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

## 🔄 Version History

- **v0.1.0**: Initial release with basic functionality
  - JWT authentication system
  - Dynamic content management
  - Responsive design
  - Admin dashboard
  - Contact form integration

---

**Built with ❤️ using Next.js, Node.js, and MongoDB** 