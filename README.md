# WarmWishes

> **Disclaimer:** Warm Wishes is **not** a real organization. It is a fictional nonprofit-style organization created as the concept for this application.

WarmWishes is a full-stack web application for managing community-service projects, tracking donations, coordinating builders, and supporting internal team communication. The project combines a React dashboard with an Express API and a SQLite data layer to provide a lightweight, local-first workflow for project operations.

## Overview

WarmWishes is designed around a simple operational flow:

- collect users, contacts, and project requests
- create and manage active projects
- assign people and roles to those projects
- track tasks, donations, and supporting datasets
- surface project activity in a dashboard-driven UI

The current application runs entirely on a **SQLite-backed backend** with a **React + Vite** frontend.

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 18, Vite, React Router, Redux Toolkit, React Redux |
| UI and feedback | Tailwind CSS, React Toastify, Recharts |
| API | Node.js, Express, CORS |
| Authentication | JSON Web Tokens, argon2 |
| Database | SQLite via `better-sqlite3` |
| Tooling | ESLint, PostCSS, Autoprefixer |

## Architecture

```text
Client (React + Vite)
   |
   |  HTTP / JSON
   v
Server (Express API)
   |
   |  database helpers
   v
SQLite (server/database/warmwishes.db)
```

### Frontend

The frontend is a Vite-powered React application that uses Redux Toolkit for state management and React Router for navigation. It includes public pages plus authenticated dashboard flows for:

- dashboard views
- projects
- donations
- project details
- project tasks
- users
- contacts inbox
- project creation

### Backend

The backend is an Express application with focused route modules for:

- users
- projects
- datasets
- contacts
- builders
- messages

Application logic is centralized through `server\database\helpers.js`, which handles data normalization, CRUD operations, relational mapping, and response shaping for the API.

### Database

The application uses SQLite as its runtime database. The schema is initialized automatically on backend startup in `server\database\db.js`.

Current persisted domains include:

- users
- user roles
- refresh tokens
- projects
- project tasks
- project users
- donations
- datasets
- dataset items
- contacts
- builders
- messages

## Data flow

WarmWishes follows a straightforward request-to-storage flow:

1. the React client sends requests to the Express API using Axios
2. Express routes validate input and delegate work to database helpers
3. helpers normalize payloads and read/write SQLite records
4. responses are returned as JSON to Redux-managed client state
5. the UI updates dashboard views, project screens, and supporting pages

This keeps the application structure simple while still separating UI, route handling, and persistence concerns.

## Core capabilities

### Authentication and session flow

- user registration and login
- JWT-based session checks
- logout and refresh-token persistence

### Project operations

- create and edit projects
- assign project owners and project users
- maintain project task lists with full task metadata
- track project donation summaries and donation records

### Operational support

- manage contact submissions and inbox retrieval
- store builder records by project type, roles, and tasks
- create and retrieve project-specific messages
- power dashboard views with dataset and chart data

## API surface

| Area | Routes |
|---|---|
| Users | `/users`, `/users/login`, `/users/me/:token`, `/users/logout/:token`, `/users/list` |
| Projects | `/projects`, `/projects/:email`, `/projects/detail/:projectId`, `/projects/:projectId`, `/projects/users/:projectId` |
| Tasks | `/projects/:projectId/tasks`, `/projects/:projectId/tasks/:taskId` |
| Donations | `/projects/:projectId/donations` |
| Datasets | `/dataset` |
| Contacts | `/contacts`, `/contacts/:email` |
| Builders | `/builders` |
| Messages | `/messages`, `/messages/project/:projectId` |

## Project structure

```text
WarmWishes/
|- client/                  # React frontend
|  |- src/                  # pages, components, layouts, redux state
|- server/                  # Express backend
|  |- contacts/             # contact routes
|  |- database/             # SQLite schema, helpers, runtime DB
|  |- routes/               # users, projects, datasets, builders, messages
|- README.md
```

## Local development

### Prerequisites

- Node.js
- npm

### 1. Install dependencies

```powershell
npm install
Set-Location .\server
npm install
Set-Location ..\client
npm install
```

### 2. Configure environment files

Copy the example files:

```powershell
Copy-Item .\server\.env.example .\server\.env
Copy-Item .\client\.env.example .\client\.env
```

Update `server\.env` with your application secret and backend settings:

```env
SECRET_KEY=replace-with-a-secure-random-value
JWT_EXPIRE=24h
PORT=8000
```

Set `client\.env` to point at the backend:

```env
VITE_NODE_SERVER_URL=http://127.0.0.1:8000
```

### 3. Start the backend

```powershell
Set-Location .\server
npm run dev
```

### 4. Start the frontend

In a second terminal:

```powershell
Set-Location .\client
npm run dev
```

## Scripts

### Client

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

### Server

```powershell
npm run dev
```

## Notes

- the backend defaults to port `8000` and also respects `PORT`
- the frontend reads the API base URL from `VITE_NODE_SERVER_URL`
- the SQLite runtime database lives at `server\database\warmwishes.db`
- on Windows, SQLite files can be locked if the server or a database viewer is still using them

## License

This repository currently uses the `ISC` license declared in `package.json`.
