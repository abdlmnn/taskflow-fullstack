# TaskFlow Fullstack

## Backend

The backend is built with Node.js/Express.js, and SQLite for database.

### Backend Dependencies

Main dependencies used:

```txt
express
cors
sqlite3
nodemon
```

### Backend Setup

Go to the backend folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Run the backend server:

```bash
npm run dev
```

The backend runs on:

```txt
http://localhost:5000
```

## Backend API

Base URL:

```txt
http://localhost:5000
```

### Task Endpoints

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| POST   | `/api/tasks`     | Create a new task             |
| GET    | `/api/tasks`     | Get all tasks                 |
| GET    | `/api/tasks/:id` | Get one task by ID            |
| PATCH  | `/api/tasks/:id` | Update task details or status |
| DELETE | `/api/tasks/:id` | Delete a task                 |

### Search and Filter

Search by task title:

```txt
GET /api/tasks?search=value
```

Filter by status:

```txt
GET /api/tasks?status=active
```

Search and filter together:

```txt
GET /api/tasks?search=value&status=inactive
```

Status values:

| Status   | Meaning                |
| -------- | ---------------------- |
| all      | Shows all tasks        |
| active   | Shows incomplete tasks |
| inactive | Shows completed tasks  |

## Frontend Setup

The frontend is built with React + Vite.

### Prerequisites

Make sure Node.js and npm are installed:

```bash
node -v
npm -v
```

## Install Frontend Dependencies

From the root project folder, go to the frontend folder:

```bash
cd client
```

Install the required frontend dependencies:

```bash
npm install
```

## Run the Frontend Development Server

Start the React + Vite development server:

```bash
npm run dev
```

After running the command, the frontend will be available at:

```txt
http://localhost:5173
```
