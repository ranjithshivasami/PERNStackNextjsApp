exports.getPosts = (req, res, next) => {
   res.status(200).json(
    {
      posts: [{ title: "Post1", content: "This is the first post" }]
    });
}

exports.createPost = (req, res, next)=>{
// const title = req.body.title;
// const content = req.body.content;
const { title, content} = req.body
 // res.json(req.body)
  res.status(201).json(
    {
      message: "Post created succesfully",
      post: {id: new Date().toISOString(), title, content}
    }
  );
}