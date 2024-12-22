const cloudinary = require('cloudinary').v2;
require("dotenv").config();
// Configuration for Cloudinary (make sure this is set up in your environment)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.url;  // Return the URL of the uploaded image
  } catch (error) {
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = { uploadImage };
