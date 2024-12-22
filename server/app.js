const express = require("express");
const multer = require('multer');


const bodyParser = require("body-parser");
const blogRouter = require("./routes/blog");
const taskRouter = require("./routes/taskRouter");

const app = express();
const cors = require("cors");  // Import cors
app.use(cors());

const fileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads/'); // Directory to save images
  },
  filename: (req, file, callBack) => {
    callBack(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname); // Generate unique filenames
  }
});

// const fileFilter = (req, file, callBack) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     callBack(null, true); // Accept file
//   } else {
//     callBack(null, false); // Reject file
//   }
// };

// Middleware for file uploads
app.use(
  multer({ storage: fileStorage}).single('file')
);
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);
  next();
});


//setting cors headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.json('Welcome to Node Express REST api...');
});

app.use('/blog', blogRouter);
app.use('/task', taskRouter);

app.listen(8080, () => {
  console.log('Server running on port 8000')
});