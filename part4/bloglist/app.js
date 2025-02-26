console.log("App.js loaded");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const tokenExtractor = require("./utils/middlewares/tokenExtract");
const app = express();
const userExtractor = require("./utils/middlewares/userExtractor");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/blogs", userExtractor, blogRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

function logErrors(err, req, res, next) {
  console.error("Error occurred:", err.stack);
  next(err);
}

app.use(logErrors);

module.exports = app;
