const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use(express.static(path.join(__dirname, "public")));

app.use("/tasks", taskRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TaskForge API running on port ${PORT}`);
  });
}

module.exports = app;