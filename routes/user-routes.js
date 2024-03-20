const users = require("../data/users");

const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.json(users);
  })
  .post("/", (req, res, next) => {
    try {
      if (req.body.name && req.body.username && req.body.email) {
        if (users.find((user) => user.username == req.body.username)) {
          throw new Error("Username already exists.");
        } else {
          const newUser = {
            id: users.length + 1,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
          };

          users.push(newUser);
          res.json(newUser);
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
      const user = users.find((user) => user.id == req.params.id);

      if (user) {
        res.json(user);
      } else {
        throw new Error("User does not exist.");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
