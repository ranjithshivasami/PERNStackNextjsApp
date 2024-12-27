const { validationResult } = require("express-validator");
const { uploadImage } = require('../utils/cloudinary');
const Post = require('../models/postModel'); 

exports.getPosts = async (req, res, next) => {
  const { page = 1 } = req.query;
  try {
    const { posts, totalPosts } = await Post.findAll(page);
    const limit = 5;
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      message: "Fetched posts successfully",
      posts,
      pagination: { totalPosts, totalPages, currentPage: parseInt(page, 10), limit }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Fetched post successfully", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createPost = async (req, res, next) => {
  const error = validationResult(req);
  if (!req.file) {
    return res.status(400).json({ message: 'File not uploaded.' });
  }
  if (!error.isEmpty()) {
    return res.status(422).json({ message: "Validation failed, entered data is incorrect.", error: error.array() });
  }

  try {
    const image = await uploadImage(req.file.path);
    const post = await Post.create(req.body.title, req.body.content, image);
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({ message: "Validation failed, entered data is incorrect.", error: error.array() });
    }
  try {
    let image = null;
    if (req.file) {
      image = await uploadImage(req.file.path);
    }
    const post = await Post.update(id, req.body.title, req.body.content, image);
      if(!post){
            return res.status(404).json({ message: "Post not found" });
        }
    res.status(200).json({ message: "Post updated successfully.", post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Post.delete(id);
      if(!deleted){
          return res.status(404).json({ message: "Post not found"});
      }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};