
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./src/db");
const userRoutes = require("./src/controllers/users/user.routes")
const taskRoutes = require("./src/controllers/tasks/task.routes")

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/tasks",taskRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));