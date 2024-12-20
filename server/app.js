const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const blogRouter = require("./routes/blog");
const taskRouter = require("./routes/taskRouter");

//middlewares
app.use(bodyParser.json());

//setting cors headers
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res)=> {
  res.json('Welcome to Node Express REST api...');
});

app.use('/blog', blogRouter);
app.use('/task', taskRouter);

app.listen(8080, ()=>{
  console.log('Server running on port 8000')
});