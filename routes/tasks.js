const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

let tasks = [
  {
    id: "1",
    title: "Finish TaskForge API",
    complete: false,
    createdAt: "2026-08-17T08:00:00.000Z"
  },
  {
    id: "2",
    title: "Test API routes",
    complete: true,
    createdAt: "2026-08-17T08:05:00.000Z"
  }
];

// GET /tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id
router.get("/:id", (req, res) => {
  const task = tasks.find((task) => task.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// POST /tasks
router.post("/", (req, res) => {
  const { title, complete } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: uuidv4(),
    title,
    complete: complete || false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// PUT /tasks/:id
router.put("/:id", (req, res) => {
  const task = tasks.find((task) => task.id === req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, complete } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  task.title = title;
  task.complete = complete;

  res.json(task);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

module.exports = router;