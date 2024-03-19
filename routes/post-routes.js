const posts = require("../data/posts");

const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.json(posts);
  })
  .post("/", (req, res) => {})
  .get("/:id", (req, res) => {
    const post = posts.find((post) => post.id == req.params.id);

    if (post) {
      res.json(post);
    } else {
      res.status(404).end();
    }
  })
  .get("/user/:id", (req, res) => {
    const userPosts = posts.filter((post) => post.userId == req.params.id);

    if (userPosts) {
      res.json(userPosts);
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
