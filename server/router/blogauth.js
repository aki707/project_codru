const express = require("express");
const Blog = require("../models/blogSchema");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/blogs", authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({
      title,
      content,
      username: req.hashedUsername, // Use the hashed username
    });
    await newBlog.save();
    res.status(201).json({ message: "Success", newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/blogs/:blogId/comments", authenticate, async (req, res) => {
  try {
    const { blogId } = req.params;
    const { comment } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments.push({ username: req.hashedUsername, comment });
    await blog.save();
    res.status(201).json({ message: "Comment added successfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
