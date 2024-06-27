const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

router.post("/blogs", async (req, res) => {
  console.log("chal gaya");
  try {
    const { title, content, username, userphoto } = req.body;

    if (!title || !content || !username || !userphoto) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      username,
      userphoto,
    });

    console.log(req.body);
    await newBlog.save();
    res.status(201).json({ message: "Success", newBlog: newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/blogsdata", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    console.log(username);
    const userExist = await User.findOne({ username: username });

    if (userExist) {
      // Fetch only blogs associated with the specific user
      const blogs = await Blog.find({ username: username });
      console.log(blogs);
      return res.status(200).json({ message: "Success", blogs: blogs });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/blogs/:blogId/comments", async (req, res) => {
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
