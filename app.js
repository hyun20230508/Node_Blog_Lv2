const express = require("express");
const cookiParser = require("cookie-parser");
const app = express();
const port = 3000;

const postsRouter = require("./router/posts.js");
const commentsRouter = require("./router/comments.js");
const userRouter = require("./router/users.js");
const authRouter = require("./router/auth.js");
const connect = require("./schemas/index.js");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiParser());
app.use("/api", [postsRouter, commentsRouter, userRouter, authRouter]);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
