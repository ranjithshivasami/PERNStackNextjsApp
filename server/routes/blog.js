const express = require("express");

const router = express.Router();
const postController = require("../controllers/postController")

//GET blog/posts
router.get('/posts', postController.getPosts);
//POST blog/posts
router.post('/posts', postController.createPost);


module.exports = router;