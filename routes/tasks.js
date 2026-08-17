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
router.get("/", async (req, res) => {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Could not read tasks" });
  }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const tasks = await readTasks();

    const task = tasks.find((task) => task.id === req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Could not read task" });
  }
});

// GET /tasks/:id/verify
router.get("/:id/verify", async (req, res) => {
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
      return res.status(400).json({
        message: "Task is missing a title"
      });
    }

    res.status(200).json({
      message: "Task verified successfully",
      task
    });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const { title, complete } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
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
    res.status(500).json({ message: "Could not create task" });
  }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const tasks = await readTasks();

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

    await writeTasks(tasks);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Could not update task" });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
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
    res.status(500).json({ message: "Could not delete task" });
  }
});

module.exports = router;