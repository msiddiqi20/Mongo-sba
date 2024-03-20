const posts = require("../data/posts");
const users = require("../data/users");

const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.json(posts);
  })
  .post("/", (req, res, next) => {
    try {
      if (req.body.userId && req.body.title && req.body.body) {
        if (users.find((user) => user.id == req.body.userId)) {
          const newPost = {
            userId: req.body.userId,
            id: posts.length - 1,
            title: req.body.title,
            body: req.body.body,
          };

          posts.push(newPost);
          res.json(newPost);
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
      const post = posts.find((post) => post.id == req.params.id);

      if (post) {
        res.json(post);
      } else {
        throw new Error("Post does not exist.");
      }
    } catch (error) {
      next(error);
    }
  })
  .get("/user/:id", (req, res, next) => {
    try {
      const userPosts = posts.filter((post) => post.userId == req.params.id);

      if (userPosts) {
        res.json(userPosts);
      } else {
        throw new Error("User does not exist.");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
