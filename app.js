const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const todoRoutes = require("./routes/todo-routes");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  connectDB();
});

// Database Connection
async function connectDB() {
  try {
    const databaseConnection = await mongoose.connect(
      "mongodb+srv://msiddiqi:JAYiIRnxXLN5BFKi@mydb.ogowrvd.mongodb.net/Data"
    );
    console.log("Database connected...");
  } catch (error) {
    console.error(error);
  }
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Users
app.use("/api/users", userRoutes);

// Posts
app.use("/api/posts", postRoutes);

// To-dos
app.use("/api/todos", todoRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).json({ Error: `${err}` });
});
