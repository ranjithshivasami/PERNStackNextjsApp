const express = require("express");
const { body } = require('express-validator');
const router = express.Router();
const postController = require("../controllers/postController")

//GET blog/posts
router.get('/posts', postController.getPosts);
router.get('/post/:id', postController.getPost);
router.delete('/post/:id', postController.deletePost);
router.put('/post/:id',
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
router.post('/post', [
  body('title')
  .trim()
  .isLength({min: 5, max: 10})
  .withMessage('Title must be between 5 and 10 characters long.'),
  body('content')
  .trim()
  .isLength({min:5})
  .withMessage('Content must be between 5 and 10 characters long.'),
], postController.createPost);


module.exports = router;