const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();

//connext to monngodb
const dbURI =
  "mongodb+srv://junliang778:test1234@node-tutorial.o6sr3.mongodb.net/Node-Tutorial?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
    //we dont want out server to be listening to requests until the db connection has been done
    /*for eg: if a user req for home page, that home page lists loads of data DEPENDENT on the 
db. We cant show tht until the connection to the db has been made*/
  })
  .catch((error) => console.log(error));

//register view engine
app.set("view engine", "ejs");

//middleware & static files
/*anything inside the public folder is gonna be made available as a static file to the 
front end*/
app.use(express.static("public"));

//middle that's gonna parsed the POST req's data into a workable format & attach it to the req object
app.use(express.urlencoded({extended:true}));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  //.send() infers the type of context we're sending to the browser & infers status code
  //auto set the Context-Type headers & status code (unlike http core module)
  // res.send('<p>home page</p>');
  // res.sendFile('./views/index.html',{root:__dirname});

  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //it's gonna use the ejs view engine and render this file
  res.render("about", { title: "About" });
});

//blog routes
//1st arg -scope this to a specific url 
//it means its gonna only apply these 'blogRoutes' when we go to /blogs
//if we're scoping (optional), we no longer need /blogs in the handlers in blogRoutes.js
app.use('/blogs',blogRoutes)

// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// })



//.use() -> middleware
app.use((req, res) => {
  //.use() executes for every incoming req (NOT SCOPED FOR PARTICULAR url)
  //if the code reaches to this point (aka no match)
  //this function's position matters (has to be the last one)
  //express doesnt realise this is a 404 status code/ 404 page bc .use() executes for every incoming req
  //manually set (we can chain bc .status() returns a res obj)

  res.status(404).render("404", { title: "404" });
});
