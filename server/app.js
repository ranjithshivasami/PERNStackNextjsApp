const express = require("express");
const multer = require('multer');


const bodyParser = require("body-parser");
const blogRouter = require("./routes/blog");
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const cors = require("cors");  // Import cors
app.use(cors());
app.use(express.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads/'); // Directory to save images
  },
  filename: (req, file, callBack) => {
    callBack(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname); // Generate unique filenames
  }
});



// Middleware for file uploads
app.use(
  multer({ storage: fileStorage}).single('file')
);

app.use((req, res, next) => {
  console.log('Request Body:', req.body);  
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
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', blogRouter);
app.use('/api/v1/task', taskRouter);

//handling unhandles routes exeptions
app.all('*', (req, res, next) =>{
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on the server!`
  });
});
module.exports = app;
