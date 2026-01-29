// routes/blogRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect } = require('../middleware/auth');
const Blog = require('../models/Blog');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create blog with user reference
    const blog = await Blog.create({
      title,
      content,
      user: req.user.id,
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    // Populate user details in the response
    await blog.populate('user', 'username');

    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (err) {
    console.error("POST BLOG ERROR:", err);
    res.status(500).json({ 
      success: false,
      message: 'Server error while creating blog' 
    });
  }
});

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    console.error("GET BLOGS ERROR:", err);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching blogs' 
    });
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    // Check if blog exists
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is the owner of the blog
    if (blog.user && blog.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    // Remove the blog
    await blog.deleteOne();


    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error("DELETE BLOG ERROR:", err);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting blog'
    });
  }
});

module.exports = router;