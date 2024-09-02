const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { authorizeRoles, authenticate } = require('../middleware/auth'); 
const Category = require('../models/Category');


router.get('/', async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = featured ? { featured: true } : {};

    const posts = await Post.find(filter).populate('author categories');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author categories');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', authenticate, authorizeRoles(['admin']), async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      throw new Error('User not authenticated');
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id, 
      categories: req.body.categories || [],
      image: req.body.image,
      status: req.body.status,
      featured: req.body.featured || false, 
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', authenticate, authorizeRoles(['admin']), async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
