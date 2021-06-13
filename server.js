const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // res.setHeader('Content-Type','text/plain');
  // res.write('Hello bruh')

  // res.setHeader('Content-Type','text.html')  <-- Send full HTML page rather than this approach
  // res.write('<p>Hello Bruh<p>')
  // res.write('<p>Hello Again<p>')

  //simple routing 
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me": //redirect to /about
      res.statusCode = 301;
      res.setHeader('Location','/about');
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  res.setHeader("Content-Type", "text.html");
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end;
    } else {
      //if we're writing mutliple things, use res.write()
      //if not, just use res.end(data)
      res.end(data);
    }
  });

  //go to the network tab to see the reqs (in dev tools)
});

//the 2nd arg is default 'localhost'
server.listen(3000, "localhost", () => {
  console.log("listening for req on port 3000");
});
