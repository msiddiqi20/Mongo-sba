const todos = require("../data/todos");
const users = require("../data/users");

const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.json(todos);
  })
  .post("/", (req, res, next) => {
    try {
      if (req.body.userId && req.body.title) {
        if (users.find((user) => user.id == req.body.userId)) {
          const newTodo = {
            userId: req.body.userId,
            id: todos.length - 1,
            title: req.body.title,
            completed: false,
          };

          todos.push(newTodo);
          res.json(newTodo);
        } else {
          throw new Error("User does not exist.");
        }
      } else {
        throw new Error("Insufficient data.");
      }
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", (req, res, next) => {
    try {
      const todo = todos.find((todo) => todo.id == req.params.id);

      if (todo) {
        res.json(todo);
      } else {
        throw new Error("Todo does not exist.");
      }
    } catch (error) {
      next(error);
    }
  })
  .get("/user/:id", (req, res, next) => {
    try {
      const userTodos = todos.filter((todo) => todo.userId == req.params.id);

      if (userTodos) {
        res.json(userTodos);
      } else {
        throw new Error("User does not exist.");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
