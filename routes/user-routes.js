const users = require("../data/users");

const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.json(users);
  })
  .post("/", (req, res) => {})
  .get("/:id", (req, res) => {
    const user = users.find((user) => user.id == req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
