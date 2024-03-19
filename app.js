const users = require("./data/users");
const posts = require("./data/posts");
const todos = require("./data/todos");

const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
