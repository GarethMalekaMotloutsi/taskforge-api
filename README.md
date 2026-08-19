# TaskForge API

A RESTful task management API built with Node.js and Express, with a lightweight web dashboard for viewing task progress.

## About

TaskForge API was created as part of a REST API development project.

The project demonstrates:

- Express.js routing
- RESTful API design
- Middleware
- Asynchronous operations
- File-based data persistence
- CRUD operations
- Request validation
- Error handling
- Asynchronous task verification
- Static frontend integration
- Production deployment with Vercel

## Technologies

- Node.js
- Express.js
- JavaScript
- UUID
- REST API
- HTML5
- CSS3
- Vercel

## Features

- Create tasks
- View all tasks
- View an individual task
- Update tasks
- Delete tasks
- Validate required task titles
- Verify tasks asynchronously
- Handle missing resources
- Log incoming requests
- Persist task data in a JSON file
- Display tasks through a web dashboard

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GarethMalekaMotloutsi/taskforge-api.git
```

### 2. Open the project

```bash
cd taskforge-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

The API will run at:

```text
http://localhost:3000
```

The TaskForge dashboard is available at:

```text
http://localhost:3000
```

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/tasks/:id/verify` | Verify a task asynchronously |

## Example Task

```json
{
  "id": "1",
  "title": "Finish TaskForge API",
  "complete": false,
  "createdAt": "2026-08-17T08:00:00.000Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes and JSON error messages for common situations, including:

- `400` — Invalid or missing request data
- `404` — Task not found
- `500` — Server or processing error

Example:

```json
{
  "message": "Task not found"
}
```

## Project Structure

```text
taskforge-api/
├── data/
│   └── tasks.json
├── middleware/
│   ├── errorHandler.js
│   └── logger.js
├── public/
│   └── index.html
├── routes/
│   └── tasks.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Dashboard

TaskForge includes a browser-based dashboard that displays:

- Total tasks
- Completed tasks
- Outstanding tasks
- Overall progress
- Individual task status
- Missing-title warnings
- API connection status

The dashboard communicates directly with the Express API.

## Deployment

The TaskForge API and dashboard are deployed using Vercel.

### Production URL

https://taskforge-api-phi.vercel.app

### Example API Endpoint

https://taskforge-api-phi.vercel.app/tasks

## Author

**Gareth Maleka Motloutsi**

GitHub:

https://github.com/GarethMalekaMotloutsi