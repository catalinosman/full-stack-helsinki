const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const blogRouter = express.Router();
const getToken = require("../utils/middlewares/tokenExtract");
const jwt = require("jsonwebtoken");
const tokenValidator = require("../utils/middlewares/tokenValidator");
const userExtractor = require("../utils/middlewares/userExtractor");

blogRouter.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

blogRouter.post("/", tokenValidator, userExtractor, async (req, res) => {
  try {
    const { title, author, url, likes } = req.body;
    if (!title || !url) {
      return res.status(400).json({ error: "Title and URL are required" });
    }

    const user = req.user;

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

blogRouter.put("/:id", tokenValidator, async (req, res) => {
  const { id } = req.params;
  const { title, author, url, likes } = req.body;

  const updatedBlog = {};
  if (title) updatedBlog.title = title;
  if (author) updatedBlog.author = author;
  if (url) updatedBlog.url = url;
  if (likes !== undefined) updatedBlog.likes = likes;

  try {
    const blog = await Blog.findByIdAndUpdate(id, updatedBlog, {
      new: true,
      runValidators: true,
    });

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

blogRouter.delete("/:id", tokenValidator, userExtractor, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log("Blog's user ID:", blog.user.toString());
    console.log("Requesting user ID:", user.id.toString());

    if (blog.user.toString() !== user.id.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = blogRouter;
