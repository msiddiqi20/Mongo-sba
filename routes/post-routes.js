const Post = require("../models/post");
const User = require("../models/user");

const express = require("express");
const router = express.Router();

router
  .get("/", async (req, res) => {
    res.json(await Post.find({}));
  })
  .post("/", async (req, res, next) => {
    try {
      if (req.body.userId && req.body.title && req.body.body) {
        if ((await User.find({ id: req.body.userId })).length != 0) {
          const newPost = new Post({
            userId: req.body.userId,
            id: (await Post.countDocuments({})) + 1,
            title: req.body.title,
            body: req.body.body,
          });

          res.json(await newPost.save());
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
      const post = await Post.find({ id: req.params.id });

      if (post.length != 0) {
        res.json(post);
      } else {
        throw new Error("Post does not exist.");
      }
    } catch (error) {
      next(error);
    }
  })
  .get("/user/:id", async (req, res, next) => {
    try {
      const userPosts = await Post.find({ userId: req.params.id });

      if (userPosts != 0) {
        res.json(userPosts);
      } else {
        throw new Error("User does not exist.");
      }
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
