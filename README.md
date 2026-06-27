# Server

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

### Backend API

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

<<<<<<< HEAD
# Client
=======
## Frontend Setup
>>>>>>> d71595ec4f89e6f173bb700b998979439ff98123

The frontend is built with React + Vite.

### Prerequisites

Make sure Node.js and npm are installed:

```bash
node -v
npm -v
```

<<<<<<< HEAD
## Frontend Setup

Go to the frontend folder:
=======
## Install Frontend Dependencies

From the root project folder, go to the frontend folder:
>>>>>>> d71595ec4f89e6f173bb700b998979439ff98123

```bash
cd client
```

<<<<<<< HEAD
Install the dependencies:
=======
Install the required frontend dependencies:
>>>>>>> d71595ec4f89e6f173bb700b998979439ff98123

```bash
npm install
```

<<<<<<< HEAD
Run the frontend server:
=======
## Run the Frontend Development Server

Start the React + Vite development server:
>>>>>>> d71595ec4f89e6f173bb700b998979439ff98123

```bash
npm run dev
```

<<<<<<< HEAD
The frontend runs on:
=======
After running the command, the frontend will be available at:
>>>>>>> d71595ec4f89e6f173bb700b998979439ff98123

```txt
http://localhost:5173
```
