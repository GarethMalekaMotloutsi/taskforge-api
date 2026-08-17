const express = require("express");

const logger = require("./middleware/logger");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use("/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`TaskForge API running on port ${PORT}`);
});