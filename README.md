TaskForge API

A simple REST API for managing tasks, built with Node.js and Express.

About

TaskForge API was created as part of a REST API development assignment. The project covers Express routing, middleware, asynchronous operations, task management and error handling.

Technologies

* Node.js
* Express.js
* JavaScript
* UUID
* REST API

Getting Started

1. Clone the repository

git clone https://github.com/GarethMalekaMotloutsi/taskforge-api.git

2. Open the project

cd taskforge-api

3. Install dependencies

npm install

4. Start the server

node server.js

The API runs on:

http://localhost:3000

API Routes

Method	Route	Description
GET	/tasks	Get all tasks
GET	/tasks/:id	Get one task
POST	/tasks	Create a task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task
GET	/tasks/:id/verify	Verify a task asynchronously

Example Task

{
  "id": "1",
  "title": "Finish TaskForge API",
  "complete": false,
  "createdAt": "2026-08-17T08:00:00.000Z"
}

Project Structure

taskforge-api/
├── data/
├── middleware/
├── public/
├── routes/
├── server.js
├── package.json
└── README.md

Deployment

The project is deployed using Vercel.

https://taskforge-api-five.vercel.app

Author

Gareth Maleka Motloutsi
