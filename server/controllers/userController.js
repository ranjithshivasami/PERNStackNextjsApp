const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const signup = async (req, res) => {
  console.log(req.body);
  const username  = req.body.username;
  const  email  = req.body.email;
  const  password  = req.body.password;

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const newUser = await userModel.createUser(username, email, hashedPassword);

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully.',
      userId: newUser.id,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  signup,
};
