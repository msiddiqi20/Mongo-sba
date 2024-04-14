const User = require("../models/user");

const express = require("express");
const router = express.Router();

router
  .get("/", async (req, res) => {
    res.json(await User.find({}));
  })
  .post("/", async (req, res, next) => {
    try {
      if (req.body.name && req.body.username && req.body.email) {
        if ((await User.find({ username: req.body.username })).length != 0) {
          throw new Error("Username already exists.");
        } else {
          const newUser = new User({
            id: (await User.countDocuments({})) + 1,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
          });

          res.json(await newUser.save());
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
      const user = await User.find({ id: req.params.id });

      if (user.length != 0) {
        res.json(user);
      } else {
        throw new Error("User does not exist.");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
