const express = require("express");
const { body } = require('express-validator');
const postController = require("../controllers/postController");
const router = express.Router();


//GET blog/posts
router
.route('/')
.get(postController.getPosts).
post( [
  body('title')
  .trim()
  .isLength({min: 5, max: 100})
  .withMessage('Title must be between 5 and 10 characters long.'),
  body('content')
  .trim()
  .isLength({min:5})
  .withMessage('Content must be between 5 and 10 characters long.'),
], postController.createPost);

//router.get('/posts', postController.getPosts);
router
.route('/:id')
.get(postController.getPost)
.delete(postController.deletePost)
.put(
  [
    body('title')
    .trim()
    .isLength({min: 5, max: 100})
    .withMessage('Title must be between 5 and 100 characters long.'),
    body('content')
    .trim()
    .isLength({min:5})
    .withMessage('Content must be between 5 and 10 characters long.'),
  ],
   postController.updatePost);


//POST blog/posts



module.exports = router;