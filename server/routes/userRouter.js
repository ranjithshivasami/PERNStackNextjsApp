// Import required modules
const express = require('express');
const userController = require('../controllers/userController');

// Initialize Express Router
const router = express.Router();

// Signup route
router.post('/signup', userController.signup);

module.exports = router;