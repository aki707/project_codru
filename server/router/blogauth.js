const express = require("express");
const Blog = require("../models/blogSchema");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/deleteblogs", async (req, res) => {
  try {
    // Delete all documents in the Blog collection
    await Blog.deleteMany({});

    res.status(200).json({ message: "All blogs deleted successfully" });
  } catch (error) {
    console.error("Error deleting blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATING THE BLOG BY USER
router.post("/blogs", async (req, res) => {
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

    await newBlog.save();
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.blogs.push(newBlog);
    await user.save();

    res.status(201).json({ message: "Success", newBlog: newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//FETCHING ALL BLOGS OF ALL USERS
router.post("/blogsdata", async (req, res) => {
  try {
    const blogs = await Blog.find().select(
      "title content username userphoto createdAt likes dislikes comments"
    );
    return res.status(200).json({ message: "Success", blogs: blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//FETHING PERTICULAR BLOG BY ITS ID
router.get("/blogs/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (blog) {
      return res.status(200).json({ message: "Success", blog: blog });
    } else {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get blogs of a particular user
router.post("/userblogs", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await User.findOne({ username }).populate("blogs");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the blog data from the populated blogs field
    const blogs = user.blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      // Add other fields you need
    }));

    res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//save blog in userschema
router.post("/blog/saveblog", async (req, res) => {
  try {
    const { blogId, username } = req.body;

    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const blogExist = await Blog.findById(blogId);
    if (!blogExist) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (!userExist.savedBlogs.includes(blogId)) {
      userExist.savedBlogs.push(blogId);
      await userExist.save();
      return res
        .status(200)
        .json({ message: "Blog saved successfully", user: userExist });
    } else {
      return res.status(400).json({ message: "Blog is already saved" });
    }
  } catch (error) {
    console.error("There was a problem with the save operation:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// Unsave blog endpoint
router.post("/blog/unsaveblog", async (req, res) => {
  try {
    const { blogId, username } = req.body;
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userExist.savedBlogs.includes(blogId)) {
      userExist.savedBlogs = userExist.savedBlogs.filter(
        (id) => id.toString() !== blogId
      );
      await userExist.save();
      return res
        .status(200)
        .json({ message: "Blog unsaved successfully", user: userExist });
    } else {
      return res.status(400).json({ message: "Blog is not saved" });
    }
  } catch (error) {
    console.error("There was a problem with the unsave operation:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

// Route to fetch saved blogs for a user
router.post("/savedblogs", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve saved blogs based on user's savedBlogs array
    const savedBlogs = await Blog.find({ _id: { $in: user.savedBlogs } });

    res.status(200).json({ savedBlogs });
  } catch (err) {
    console.error("Error fetching saved blogs:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LIKING A BLOG BY ANY USER
router.post("/blog/like", async (req, res) => {
  try {
    const { blogId, username } = req.body;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.likedBy.includes(username)) {
      blog.likes--;
      blog.likedBy = blog.likedBy.filter((user) => user !== username);
    } else {
      blog.likes++;
      blog.likedBy.push(username);

      if (blog.dislikedBy.includes(username)) {
        blog.dislikes--;
        blog.dislikedBy = blog.dislikedBy.filter((user) => user !== username);
      }
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DISLIKING BLOG BY ANY USER

router.post("/blog/dislike", async (req, res) => {
  try {
    const { blogId, username } = req.body;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.dislikedBy.includes(username)) {
      blog.dislikes--;
      blog.dislikedBy = blog.dislikedBy.filter((user) => user !== username);
    } else {
      blog.dislikes++;
      blog.dislikedBy.push(username);

      if (blog.likedBy.includes(username)) {
        blog.likes--;
        blog.likedBy = blog.likedBy.filter((user) => user !== username);
      }
    }

    await blog.save();
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FETHING COMMENTS OF SPECIFIC BLOG
router.get("/comments/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADDING COMMENT AND REPLY OF THAT COMMENT
router.post("/comments", async (req, res) => {
  try {
    const { blogId, Username, Photo, text, parentId } = req.body;
    if (!blogId || !Username || !Photo || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const newComment = {
      name: Username,
      photo: Photo,
      text: text,
      replies: [],
    };

    if (parentId) {
      // Find the root comment (A)
      const findRootComment = (comments, parentId) => {
        for (let comment of comments) {
          if (comment._id.equals(parentId)) {
            return comment;
          }
          const foundComment = findRootComment(comment.replies, parentId);
          if (foundComment) return foundComment;
        }
        return null;
      };

      const findDirectRootComment = (comments) => {
        for (let comment of comments) {
          if (
            comment._id.equals(parentId) ||
            findRootComment(comment.replies, parentId)
          ) {
            return comment;
          }
        }
        return null;
      };

      const rootComment = findDirectRootComment(blog.comments);

      if (rootComment) {
        // Add the new comment directly under the root comment (A)
        rootComment.replies.push(newComment);
      } else {
        return res.status(404).json({ error: "Root comment not found" });
      }
    } else {
      blog.comments.push(newComment);
    }

    await blog.save();
    res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETING THE COMMENT BY ANY USER
router.delete("/comments/:commentId", async (req, res) => {
  try {
    const { blogId } = req.body; // Fetching blogId from the request body
    const { commentId } = req.params; // Fetching commentId from the URL parameters

    if (!blogId || !commentId) {
      return res
        .status(400)
        .json({ error: "Blog ID and Comment ID are required" });
    }

    const blog = await Blog.findById(blogId); // Fetch the blog by ID
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Recursively delete the comment and its replies
    const deleteComment = (comments) => {
      return comments.filter((comment) => {
        if (!comment || !comment._id) {
          console.error("Comment or Comment ID is undefined:", comment); // Log the problematic comment
          return true; // Keep the comment if it's undefined to avoid breaking the code
        }
        if (comment._id.toString() === commentId) {
          // Use .toString() for comparison
          return false; // Remove the comment
        }
        comment.replies = deleteComment(comment.replies); // Recursively delete replies
        return true; // Keep the comment if it doesn't match the commentId
      });
    };

    // Update the blog comments
    blog.comments = deleteComment(blog.comments);

    await blog.save(); // Save the updated blog document
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err); // Log any errors
    res.status(500).json({ error: err.message });
  }
});

// Helper function to find a comment or reply by ID recursively
const findCommentOrReply = (comments, id) => {
  for (let comment of comments) {
    if (comment._id.equals(id)) return comment;
    const found = findCommentOrReply(comment.replies, id);
    if (found) return found;
  }
  return null;
};

// LIKING THE COMMENT BY AN USER
router.post("/comments/like", async (req, res) => {
  try {
    const { blogId, commentId, username } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const comment = findCommentOrReply(blog.comments, commentId);
    if (comment) {
      if (comment.likedBy.includes(username)) {
        // Undo like
        comment.likes -= 1;
        comment.likedBy.pull(username);
      } else {
        comment.likes += 1;
        comment.likedBy.push(username);
        if (comment.dislikedBy.includes(username)) {
          comment.dislikes -= 1;
          comment.dislikedBy.pull(username);
        }
      }
      await blog.save();
      res.status(200).json({ message: "Like updated" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DISLIKING THE COMMENT BY THE USER
router.post("/comments/dislike", async (req, res) => {
  try {
    const { blogId, commentId, username } = req.body;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const comment = findCommentOrReply(blog.comments, commentId);
    if (comment) {
      if (comment.dislikedBy.includes(username)) {
        // Undo dislike
        comment.dislikes -= 1;
        comment.dislikedBy.pull(username);
      } else {
        comment.dislikes += 1;
        comment.dislikedBy.push(username);
        if (comment.likedBy.includes(username)) {
          comment.likes -= 1;
          comment.likedBy.pull(username);
        }
      }
      await blog.save();
      res.status(200).json({ message: "Dislike updated" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EDIT THE COMMENT BY AN USER
router.put("/comments/edit", async (req, res) => {
  try {
    const { blogId, commentId, newText } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const findComment = (comments, id) => {
      for (let comment of comments) {
        if (comment._id.equals(id)) return comment;
        const found = findComment(comment.replies, id);
        if (found) return found;
      }
      return null;
    };

    const comment = findComment(blog.comments, commentId);
    if (comment) {
      comment.text = newText;
      await blog.save();
      res.status(200).json({ message: "Comment edited" });
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// changing photo in comments using profile

router.put("/updateUserPhoto", async (req, res) => {
  const { username, newPhoto } = req.body;

  try {
    // Update the user's photo in the blogs
    await Blog.updateMany({ username }, { $set: { userphoto: newPhoto } });

    // Fetch all blogs to update comments and nested replies
    const blogs = await Blog.find();

    for (let blog of blogs) {
      let updated = false;

      // Update comments
      for (let comment of blog.comments) {
        if (comment.name === username) {
          comment.photo = newPhoto;
          updated = true;
        }

        // Update nested replies
        if (updateNestedReplies(comment.replies, username, newPhoto)) {
          updated = true;
        }
      }

      // Save the updated blog document
      if (updated) {
        await blog.save();
      }
    }

    res.status(200).send("User photo updated in all blogs and comments");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Helper function to recursively update nested replies
const updateNestedReplies = (replies, username, newPhoto) => {
  let updated = false;

  for (let reply of replies) {
    if (reply.name === username) {
      reply.photo = newPhoto;
      updated = true;
    }

    if (reply.replies && reply.replies.length > 0) {
      if (updateNestedReplies(reply.replies, username, newPhoto)) {
        updated = true;
      }
    }
  }

  return updated;
};

router.post("/follow", async (req, res) => {
  const { currentUserId, targetUserId } = req.body;

  try {
    const currentUser = await User.findOne({ username: currentUserId });
    const targetUser = await User.findOne({ username: targetUserId });

    if (!currentUser || !targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Follow
    if (
      !currentUser.following.some((f) => f.username === targetUser.username)
    ) {
      currentUser.following.push({
        username: targetUser.username,
        name: targetUser.name,
        photo: targetUser.photo,
      });

      targetUser.followers.push({
        username: currentUser.username,
        name: currentUser.name,
        photo: currentUser.photo,
      });

      await currentUser.save();
      await targetUser.save();
    }

    res.status(200).json({
      success: true,
      isFollowing: true,
    });
  } catch (error) {
    console.error("Error in follow route:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/unfollow", async (req, res) => {
  const { currentUserId, targetUserId } = req.body;

  try {
    const currentUser = await User.findOne({ username: currentUserId });
    const targetUser = await User.findOne({ username: targetUserId });

    if (!currentUser || !targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Unfollow
    currentUser.following = currentUser.following.filter(
      (f) => f.username !== targetUser.username
    );
    targetUser.followers = targetUser.followers.filter(
      (f) => f.username !== currentUser.username
    );

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      user: currentUser,
      success: true,
      isFollowing: false,
    });
  } catch (error) {
    console.error("Error in unfollow route:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
