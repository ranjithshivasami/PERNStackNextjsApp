const { validationResult } = require("express-validator");
const { uploadImage } = require('../utils/cloudinary');  // Import the new utility
const db = require("../db");

const getPostById = async (id) => {
  const result = await db.query("SELECT id, title, content, image, createdat FROM posts WHERE id = $1", [id]);    
  if (result.rowCount === 0) {
    throw new Error("No post exists for the given ID");
  }
  return result.rows[0];  // Return the post object
};

exports.getPosts = async (req, res, next) => {
  const { page = 1} = req.query;  // Default to page 1 and limit 10 if not provided
  const limit = 5;
  // Validate page and limit as positive integers
  if (page <= 0 ) {
    return res.status(400).json({ message: "Page must be positive integers." });
  }

  // Calculate the offset for pagination
  const offset = (page - 1) * limit;

  try {
    // Fetch posts with pagination
    const result = await db.query(
      "SELECT id, title, content, image, createdat FROM posts ORDER BY createdat DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    // Fetch total count of posts for calculating total pages
    const countResult = await db.query("SELECT COUNT(*) FROM posts");
    const totalPosts = parseInt(countResult.rows[0].count, 10);

    // Calculate total pages
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      message: "Fetched posts successfully",
      posts: result.rows,
      pagination: {
        totalPosts,
        totalPages,
        currentPage: parseInt(page, 10),
        limit: parseInt(limit, 10)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  try{
    const post = await getPostById(id);     
    res.status(200).json({
      "message": "Fetched post successfully",
      "post": post
    });
  }catch(error){
    return res.status(422).json({ message: error.message });
  } 
}

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const getPost = await getPostById(id);  // Use the reusable function to fetch the post

  const post = await db.query("SELECT id, title, content, image, createdat FROM posts WHERE id = $1", [id]);
  if (post.rowCount === 0) {
    res.status(422).json({
      "message": "No post exists for the give id",
    });
  }

  let sql = "UPDATE posts SET title=$1, content=$2 WHERE id=$3 RETURNING *"
  let params = [title, content, id];
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(422).json({ message: "Validation failed, entered data is incorrect.", error: error.array() });
  }
  if (req.file) {
    try {
      const image = await uploadImage(req.file.path);  // Use reusable image upload function
      sql += ", image=$4";
      params.push(image);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  const result = await db.query(sql, params);
  res.status(200).json({
    message: "Post updated successfully.",
    post: result.rows[0]
  });
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
    const image = await uploadImage(req.file.path);  // Use reusable image upload function

    const { title, content } = req.body;
    const result = await db.query("INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING *", [title, content, image]);

    res.status(201).json({
      message: "Post created successfully",
      post: result.rows[0]
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);  // Use the reusable function to fetch the post
    const result = await db.query("DELETE FROM posts WHERE id=$1", [id]);
    res.status(200).json({
      message: "Post deleted successfully",    
    });
  } catch (error) {
    res.status(422).json({
      "message": error.message,
    });
  }
};