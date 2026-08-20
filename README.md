# MEAN Task Management Application

A role-based Task Management Application built with MongoDB, Express, Angular 19, and Node.js. Its functionality is limited to authentication, role-aware user/task access, and task management.

## Prerequisites

- Node.js 20 or newer
- MongoDB running locally, or a MongoDB Atlas connection string

## Backend setup

1. In `backend`, copy `.env.sample` to `.env` and set a `JWT_SECRET`.
2. Select the database connection with `DB_TYPE=local` or `DB_TYPE=atlas`.
3. For local MongoDB, use `MONGODB_LOCAL_URI`; for Atlas, set `MONGODB_ATLAS_URI`.
4. Install and start the server:

```bash
cd backend
npm install
npm run dev
```

## Frontend setup

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.
