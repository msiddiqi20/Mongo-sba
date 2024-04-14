const Todo = require("../models/todo");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

router
  .get("/", async (req, res) => {
    res.json(await Todo.find({}));
  })
  .post("/", async (req, res, next) => {
    try {
      if (req.body.userId && req.body.title) {
        if ((await User.find({ id: req.body.userId })).length != 0) {
          const newTodo = new Todo({
            userId: req.body.userId,
            id: (await Todo.countDocuments({})) + 1,
            title: req.body.title,
            completed: false,
          });

          res.json(await newTodo.save());
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
  .get("/:id", async (req, res, next) => {
    try {
      const todo = await Todo.find({ id: req.params.id });

      if (todo.length != 0) {
        res.json(todo);
      } else {
        throw new Error("Todo does not exist.");
      }
    } catch (error) {
      next(error);
    }
  })
  .get("/user/:id", async (req, res, next) => {
    try {
      const userTodos = await Todo.find({ userId: req.params.id });

      if (userTodos.length != 0) {
        res.json(userTodos);
      } else {
        throw new Error("User does not exist.");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
