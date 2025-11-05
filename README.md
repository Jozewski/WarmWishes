# WarmWishes 🎁

> A comprehensive project management platform designed for non-profit organizations to streamline donation tracking, volunteer coordination, and project management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Support](#support)

---

## 🌟 Overview

**WarmWishes** is a full-stack web application built to help non-profit organizations manage their operations more effectively. The platform provides tools for tracking donations, managing volunteers, coordinating projects, and facilitating communication between team members.

The application was specifically designed to support organizations providing warmth and comfort during cold months, such as clothing drives, blanket distributions, and winter assistance programs.

### Mission

> "When we join together, we can swell the tide for the benefit of all."

WarmWishes aims to streamline non-profit operations so organizations can focus more on their mission and less on administrative overhead.

---

## ✨ Features

### 🎯 Project Management
- **Project Dashboard**: View all active, upcoming, and ongoing projects
- **Role-Based Views**: Customized dashboards for different user roles
- **Project Details**: Comprehensive project information including status, timelines, and team members
- **Task Management**: Create, update, and delete project tasks
- **Project Tracking**: Monitor project progress and milestones

### 💰 Donation Tracking
- **Dynamic Donation Entry**: Add multiple donation items with quantities
- **Category Management**: Organize donations by type (Bulk, Corporate Sponsor, Individual, Clothing Drive)
- **Real-Time Updates**: Instant donation tracking and reporting
- **Donation History**: Complete audit trail of all donations
- **Summary Analytics**: View total items donated per project

### 💬 Communication & Messaging
- **Project Status Updates**: Send progress updates to team members
- **Final Reports**: Submit comprehensive project completion reports
- **Message Types**: Support for status updates and final reports
- **Message History**: Track all communications by project
- **Team Notifications**: Keep stakeholders informed

### 👥 User & Contact Management
- **User Profiles**: Manage user information and roles
- **Contact Forms**: Collect volunteer and donor information
- **Contact Inbox**: Review and manage incoming inquiries
- **Multi-Role Support**: Users can have multiple roles (CSO, HHH, IC, LM, PM)

### 📊 Analytics & Reporting
- **Data Visualization**: Interactive charts using Recharts
- **Custom Dashboards**: Role-specific analytics views
- **Dataset Management**: Create and manage custom data sets
- **Export Capabilities**: Generate reports for stakeholders

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Argon2 encryption for user passwords
- **Role-Based Access Control**: Permissions based on user roles
- **Session Management**: Secure session handling with Redux

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite
- **State Management**: Redux Toolkit 2.5.0 + React Redux 9.2.0
- **Routing**: React Router 7.1.1
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS + PostCSS
- **Charts**: Recharts
- **Notifications**: React Toastify 11.0.5
- **Linting**: ESLint

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.21.2
- **Database**: MongoDB with Mongoose ODM 8.9.2
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**: Argon2 password hashing
- **CORS**: Cross-origin resource sharing enabled
- **Environment**: dotenv for configuration

### Database
- **Primary**: MongoDB (NoSQL)
- **ODM**: Mongoose for schema validation and models

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
  - Download: [https://nodejs.org/](https://nodejs.org/)
  - Verify: `node --version`

- **MongoDB**: Latest version
  - Download: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
  - Or use MongoDB Atlas (cloud): [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  - Verify: `mongod --version`

- **npm** or **yarn**: Package manager (npm comes with Node.js)
  - Verify: `npm --version`

- **Git**: Version control
  - Download: [https://git-scm.com/](https://git-scm.com/)
  - Verify: `git --version`

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Jozewski/WarmWishes.git
cd WarmWishes
```

### 2. Install Dependencies

#### Install Root Dependencies
```bash
npm install
```

#### Install Backend Dependencies
```bash
cd server
npm install
cd ..
```

#### Install Frontend Dependencies
```bash
cd client
npm install
cd ..
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Create a new database (optional)
mongosh
> use warmwishes
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Whitelist your IP address

---

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# MongoDB Configuration
MONGODB_CONNECTION_STRING=mongodb://localhost:27017/warmwishes
# Or for MongoDB Atlas:
# MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/warmwishes

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### Frontend Configuration

Create a `.env` file in the `client` directory:

```env
# API Configuration
VITE_NODE_SERVER_URL=http://localhost:8000

# App Configuration
VITE_APP_NAME=WarmWishes
VITE_APP_VERSION=1.0.0
```

### Environment Variables Reference

#### Backend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 8000 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `MONGODB_CONNECTION_STRING` | MongoDB connection URL | - | **Yes** |
| `JWT_SECRET` | Secret key for JWT tokens | - | **Yes** |
| `JWT_EXPIRE` | JWT token expiration time | 7d | No |
| `CORS_ORIGIN` | Allowed CORS origin | * | No |

#### Frontend Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_NODE_SERVER_URL` | Backend API URL | - | **Yes** |
| `VITE_APP_NAME` | Application name | WarmWishes | No |
| `VITE_APP_VERSION` | Application version | 1.0.0 | No |

---

## 🏃 Usage

### Development Mode

#### Start Backend Server

```bash
cd server
npm run dev
```

The backend server will start on `http://localhost:8000`

#### Start Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd client
npm run build
```

This creates an optimized production build in `client/dist`

#### Start Production Server

```bash
cd server
npm start
```

### Running Tests

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000
```

### Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

#### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users` | Create new user | No |
| POST | `/users/login` | User login | No |
| POST | `/users/logout` | User logout | Yes |
| GET | `/users/me` | Get current user | Yes |
| GET | `/users/all` | Get all users | Yes |

#### Projects

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/projects` | Create project | Yes |
| GET | `/projects/:email` | Get user's projects | Yes |
| GET | `/projects/detail/:projectId` | Get project details | Yes |
| PUT | `/projects/:projectId` | Update project | Yes |
| PUT | `/projects/:projectId/donations` | Update project donations | Yes |

#### Project Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/projects/:projectId/tasks` | Create task | Yes |
| PUT | `/projects/:projectId/tasks` | Update task | Yes |
| DELETE | `/projects/:projectId/tasks/:taskId` | Delete task | Yes |

#### Messages

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/messages` | Create message | Yes |
| GET | `/messages` | Get all messages | Yes |
| GET | `/messages/project/:projectId` | Get project messages | Yes |

#### Contacts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/contacts` | Submit contact form | No |
| GET | `/contacts` | Get all contacts | Yes |

#### Builders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/builders` | Create builder | Yes |
| GET | `/builders` | Get all builders | Yes |

#### Data Sets

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/dataset` | Create dataset | Yes |
| GET | `/dataset` | Get all datasets | Yes |

### Request/Response Examples

#### Create User

**Request:**
```bash
POST /users
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "username": "johndoe",
  "password": "SecurePassword123!",
  "roles": ["Volunteer"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "username": "johndoe",
    "roles": ["Volunteer"]
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Update Donations

**Request:**
```bash
PUT /projects/:projectId/donations
Content-Type: application/json
Authorization: Bearer <token>

{
  "donations": [
    {
      "donatedItem": "Winter Coats",
      "numberOfItems": 50
    },
    {
      "donatedItem": "Blankets",
      "numberOfItems": 100
    }
  ],
  "category": "Corporate Sponsor",
  "status": "Active",
  "description": "Corporate donation from ABC Company"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Donations updated successfully.",
  "project": {
    "id": "507f1f77bcf86cd799439011",
    "projectName": "Winter Relief 2025",
    "donations": [...],
    "donationSummary": {
      "totalItems": 150,
      "lastUpdated": "2025-11-05T10:30:00.000Z",
      "description": "Corporate donation from ABC Company"
    }
  }
}
```

#### Send Project Message

**Request:**
```bash
POST /messages
Content-Type: application/json
Authorization: Bearer <token>

{
  "projectId": "507f1f77bcf86cd799439011",
  "projectName": "Winter Relief 2025",
  "senderId": "user@example.com",
  "senderName": "John Doe",
  "messageType": "status_update",
  "content": "Project is on track. We've distributed 80% of supplies."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully.",
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "projectId": "507f1f77bcf86cd799439011",
    "projectName": "Winter Relief 2025",
    "senderName": "John Doe",
    "messageType": "status_update",
    "content": "Project is on track. We've distributed 80% of supplies.",
    "createdAt": "2025-11-05T10:30:00.000Z",
    "isRead": false
  }
}
```

---

## 📁 Project Structure

```
WarmWishes/
├── client/                     # Frontend React application
│   ├── public/                # Public static files
│   ├── src/
│   │   ├── assets/           # Images, fonts, etc.
│   │   │   └── images/
│   │   ├── components/       # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── SideNav.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Dashboard*.jsx (5 role-specific dashboards)
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ContactsInbox.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── ProjectTasks.jsx
│   │   │   ├── Users.jsx
│   │   │   └── ...
│   │   ├── redux/            # Redux state management
│   │   │   ├── authSlice.js
│   │   │   ├── authService.js
│   │   │   ├── projectsSlice.js
│   │   │   ├── projectService.js
│   │   │   ├── messagesSlice.js
│   │   │   ├── messageService.js
│   │   │   ├── contactsSlice.js
│   │   │   ├── userSlice.js
│   │   │   └── ...
│   │   ├── layouts/          # Layout components
│   │   ├── App.jsx           # Root component
│   │   ├── store.js          # Redux store configuration
│   │   └── main.jsx          # Entry point
│   ├── .env                  # Environment variables
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── tailwind.config.js    # Tailwind CSS configuration
│
├── server/                    # Backend Node.js application
│   ├── routes/               # API routes
│   │   ├── users/           # User routes
│   │   │   ├── userCreate.js
│   │   │   ├── userLogin.js
│   │   │   ├── userLogout.js
│   │   │   ├── userGetMany.js
│   │   │   ├── userMe.js
│   │   │   └── userIndex.js
│   │   ├── projects/        # Project routes
│   │   │   ├── projectCreate.js
│   │   │   ├── projectUpdate.js
│   │   │   ├── projectDonationUpdate.js
│   │   │   ├── projectGetOne.js
│   │   │   ├── projectGetMany.js
│   │   │   ├── projectTaskCreate.js
│   │   │   ├── projectTaskUpdate.js
│   │   │   ├── projectTaskDelete.js
│   │   │   └── projectIndex.js
│   │   ├── messages/        # Message routes
│   │   │   ├── messageCreate.js
│   │   │   ├── messageGetMany.js
│   │   │   ├── messageGetByProject.js
│   │   │   └── messageIndex.js
│   │   ├── builders/        # Builder routes
│   │   └── data/            # Data set routes
│   ├── schemas/             # Mongoose schemas & models
│   │   ├── userSchema.js
│   │   ├── userModel.js
│   │   ├── projectSchema.js
│   │   ├── projectModel.js
│   │   ├── messageSchema.js
│   │   ├── messageModel.js
│   │   └── ...
│   ├── contacts/            # Contact management
│   │   ├── contactSchema.js
│   │   ├── contactModel.js
│   │   ├── contactCreate.js
│   │   └── contactIndex.js
│   ├── .env                 # Environment variables
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies
│
├── test/                     # Test files
├── REFACTORING_ANALYSIS.md  # Technical documentation
├── README.md                # This file
├── package.json             # Root dependencies
└── .gitignore               # Git ignore rules
```

---

## 👥 User Roles

WarmWishes supports five distinct user roles, each with specific permissions and dashboard views:

### 1. **CSO (Chief Service Officer)**
- Access to all project data and analytics
- Can create and manage all projects
- Views organization-wide metrics
- Manages user roles and permissions

### 2. **HHH (Helping Hands Hero)**
- Focuses on volunteer coordination
- Tracks volunteer hours and contributions
- Manages volunteer-specific projects
- Views volunteer analytics

### 3. **IC (Inventory Coordinator)**
- Manages donation inventory
- Tracks donation items and quantities
- Generates inventory reports
- Monitors stock levels

### 4. **LM (Logistics Manager)**
- Coordinates project logistics
- Manages distribution schedules
- Tracks delivery and pickup
- Handles resource allocation

### 5. **PM (Project Manager)**
- Creates and manages projects
- Assigns tasks to team members
- Monitors project progress
- Generates project reports
- Sends status updates and final reports

### Role Assignment

Users can have multiple roles. Roles are assigned during user creation or updated by administrators.

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/YourUsername/WarmWishes.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Describe your changes in detail
   - Reference any related issues
   - Wait for code review

### Code Style Guidelines

#### JavaScript/React
- Use ES6+ features
- Follow React Hooks best practices
- Use functional components over class components
- Keep components small and focused
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

#### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use dark mode variants where applicable

#### Git Commits
- Use present tense ("Add feature" not "Added feature")
- Keep commits focused and atomic
- Write descriptive commit messages
- Reference issue numbers when applicable

### Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Screenshots**: If applicable
6. **Environment**: OS, Browser, Node version, etc.
7. **Additional Context**: Any other relevant information

### Feature Requests

For feature requests, please provide:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: How would you implement it?
3. **Alternatives Considered**: Other approaches you've thought about
4. **Additional Context**: Mockups, examples, etc.

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### MongoDB Connection Error

**Error:** `MongoServerError: Authentication failed`

**Solution:**
```bash
# Check your connection string in .env
# Make sure username, password, and database name are correct
MONGODB_CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/warmwishes

# For local MongoDB, ensure the service is running:
mongod

# Check if MongoDB is accessible:
mongosh
```

#### CORS Error

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
```javascript
// In server/index.js, ensure CORS is configured:
import cors from "cors"
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}))
```

#### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::8000`

**Solution:**
```bash
# Find and kill the process using the port
# On Linux/Mac:
lsof -ti:8000 | xargs kill -9

# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or change the port in server/.env:
PORT=8001
```

#### JWT Token Invalid

**Error:** `JsonWebTokenError: invalid token`

**Solution:**
```bash
# Clear browser localStorage/sessionStorage
# In browser console:
localStorage.clear()
sessionStorage.clear()

# Then login again

# Or check JWT_SECRET in server/.env is set correctly
```

#### Dependencies Installation Failed

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# If still failing, use legacy peer deps:
npm install --legacy-peer-deps
```

#### Vite Build Error

**Error:** Build fails with memory error

**Solution:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Or add to package.json scripts:
"build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
```

### Debug Mode

Enable debug logging:

**Backend:**
```javascript
// In server/index.js
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
  })
}
```

**Frontend:**
```javascript
// Redux DevTools are enabled by default in development
// Check Redux state in browser DevTools
```

### Getting Help

If you're still experiencing issues:

1. Check existing [GitHub Issues](https://github.com/Jozewski/WarmWishes/issues)
2. Search [Stack Overflow](https://stackoverflow.com/) for similar problems
3. Open a new issue with detailed information
4. Contact the development team (see Support section)

---

## 📄 License

This project is licensed under the GNU General Public License - see the [LICENSE](LICENSE) file for details.

---

## 💬 Support

### Need Help?

- **Documentation**: Check this README and `REFACTORING_ANALYSIS.md`
- **GitHub Issues**: [Report bugs or request features](https://github.com/Jozewski/WarmWishes/issues)

### Acknowledgments

Special thanks to:
- All contributors who have helped build WarmWishes
- The open-source community for amazing tools and libraries
- Non-profit organizations providing feedback and requirements
- Bombass Sock Company for their partnership and donations

### Project Maintainers

- **Lead Developer**: [Joanne Liszewski](https://github.com/Jozewski)
- **Contributors**: See GitHub contributors

---

## 🗺️ Roadmap

### Upcoming Features

**Version 1.1.0**
- [ ] Real-time notifications with WebSockets
- [ ] Email integration for message notifications
- [ ] Advanced analytics dashboard
- [ ] Export reports to PDF/CSV
- [ ] File upload for donation photos

**Version 1.2.0**
- [ ] Mobile app (React Native)
- [ ] QR code generation for inventory
- [ ] Multi-language support (i18n)
- [ ] Advanced search and filtering
- [ ] Calendar integration for events

**Version 2.0.0**
- [ ] AI-powered donation predictions
- [ ] Blockchain for donation transparency
- [ ] Integration with payment gateways
- [ ] Public donor portal
- [ ] Automated thank-you emails

### Recent Updates

**Version 1.0.0** (Current)
- ✅ Full donation tracking system
- ✅ Project messaging and status updates
- ✅ Role-based authentication
- ✅ Contact management
- ✅ Analytics dashboards
- ✅ Task management

---

## 🎯 Quick Start Checklist

- [ ] Node.js installed
- [ ] MongoDB installed/configured
- [ ] Repository cloned
- [ ] Dependencies installed (root, client, server)
- [ ] Environment files created (.env)
- [ ] MongoDB connection string configured
- [ ] JWT secret set
- [ ] Backend server running
- [ ] Frontend dev server running
- [ ] Able to create user account
- [ ] Able to login successfully
- [ ] Can view dashboard

---

<div align="center">

**Built with ❤️ for non-profit organizations making a difference**

**Author:** Joanne Liszewski

[⬆ Back to Top](#warmwishes-)

</div>
