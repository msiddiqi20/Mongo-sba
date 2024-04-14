const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
