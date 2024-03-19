const todos = require("../data/todos");

const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.json(todos);
  })
  .post("/", (req, res) => {})
  .get("/:id", (req, res) => {
    const todo = todos.find((todo) => todo.id == req.params.id);

    if (todo) {
      res.json(todo);
    } else {
      res.status(404).end();
    }
  })
  .get("/user/:id", (req, res) => {
    const userTodos = todos.filter((todo) => todo.userId == req.params.id);

    if (userTodos) {
      res.json(userTodos);
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
