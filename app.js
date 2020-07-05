const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// App config
let app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose/model config
mongoose.connect("mongodb://localhost/restful_blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: String,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

// routes
app.get("/", function (req, res) {
  res.redirect("/blogs");
});

// index
app.get("/blogs", function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

// new
app.get("/blogs/new", function (req, res) {
  res.render("new");
});

// create
app.post("/blogs", function (req, res) {
  const blog = req.body.blog;
  Blog.create(blog, function (err, blog) {
    if (err) {
      console.log(err);
      res.render("blogs/new");
    } else {
      res.redirect("/blogs");
    }
  });
});

// show
app.get("/blogs/:id", function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("App has started");
  }
});
