const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const todoRoutes = require("./routes/todo-routes");

const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// Middleware

// Users
app.use("/api/users", userRoutes);

// Posts
app.use("/api/posts", postRoutes);

// To-dos
app.use("/api/todos", todoRoutes);
