const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

const tasksFile = path.join(__dirname, "..", "data", "tasks.json");

async function readTasks() {
  const data = await fs.readFile(tasksFile, "utf8");
  return JSON.parse(data);
}

async function writeTasks(tasks) {
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
}

// GET /tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res, next) => {
  try {
    const tasks = await readTasks();

    const task = tasks.find((task) => task.id === req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// GET /tasks/:id/verify
router.get("/:id/verify", async (req, res, next) => {
  try {
    const tasks = await readTasks();

    const task = tasks.find((task) => task.id === req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1500);
    });

    if (!task.title) {
      const error = new Error("Task is missing a title");
      error.statusCode = 400;
      return next(error);
    }

    res.status(200).json({
      message: "Task verified successfully",
      task
    });
  } catch (error) {
    next(error);
  }
});

// POST /tasks
router.post("/", async (req, res, next) => {
  try {
    const { title, complete } = req.body;

    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      return next(error);
    }

    const tasks = await readTasks();

    const newTask = {
      id: uuidv4(),
      title,
      complete: complete || false,
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res, next) => {
  try {
    const tasks = await readTasks();

    const task = tasks.find((task) => task.id === req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, complete } = req.body;

    if (!title) {
      const error = new Error("Title is required");
      error.statusCode = 400;
      return next(error);
    }

    task.title = title;
    task.complete = complete;

    await writeTasks(tasks);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const tasks = await readTasks();

    const taskIndex = tasks.findIndex((task) => task.id === req.params.id);

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    tasks.splice(taskIndex, 1);

    await writeTasks(tasks);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;