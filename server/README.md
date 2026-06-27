# Backend

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
