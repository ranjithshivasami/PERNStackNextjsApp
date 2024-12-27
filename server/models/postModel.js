// models/post.js
const db = require("../db");

const Post = {
  findById: async (id) => {
    try {
      const result = await db.query("SELECT id, title, content, image, createdat FROM posts WHERE id = $1", [id]);
      if (result.rowCount === 0) {
        return null;
      }
      return result.rows[0]; // Return the raw object
    } catch (error) {
      throw error;
    }
  },

  findAll: async (page = 1, limit = 5) => {
    try {
      const offset = (page - 1) * limit;

      const result = await db.query(
        "SELECT id, title, content, image, createdat FROM posts ORDER BY createdat DESC LIMIT $1 OFFSET $2",
        [limit, offset]
      );

      const countResult = await db.query("SELECT COUNT(*) FROM posts");
      const totalPosts = parseInt(countResult.rows[0].count, 10);

      return { posts: result.rows, totalPosts }; // Return raw objects
    } catch (error) {
      throw error;
    }
  },

  create: async (title, content, image) => {
    try {
      const result = await db.query(
        "INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING id, title, content, image, createdat",
        [title, content, image]
      );
      return result.rows[0]; // Return the raw object
    } catch (error) {
      throw error;
    }
  },

  update: async (id, title, content, image) => {
    try {
      let sql = "UPDATE posts SET title=$1, content=$2";
      let params = [title, content];
      if (image) {
        sql += ", image=$3";
        params.push(image);
      }
      sql += " WHERE id=$4 RETURNING id, title, content, image, createdat";
      params.push(id);
      const result = await db.query(sql, params);
        if (result.rowCount === 0) {
            return null;
        }
      return result.rows[0]; // Return the raw object
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const result = await db.query("DELETE FROM posts WHERE id=$1", [id]);
        return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Post;