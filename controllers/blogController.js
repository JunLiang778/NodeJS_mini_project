const Blog = require("../models/blog");

const blog_index = (req, res) => {
  //.find() -> find all documents in the collection
  //-1 -> descending ordeer
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.status(404).render('404',{title:'Blog not found'})
    });
};

const blog_create_get = (req,res)=>{
    res.render("create", { title: "Create a new Blog" });
}

const blog_create_post = (req,res)=>{
    const blog = new Blog(req.body);
    blog
      .save()
      .then((result) => {
        res.redirect("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
} 

const blog_delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then((result) => {
        //we cant redirect here bc we're sending an AJAX req from the frontend
        //so in Node, we cannot redirect as a response (we have to send a text data or json back to the browser)
        //we'll send json data back instead
        res.json({ redirect: "/blogs" });
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
};
