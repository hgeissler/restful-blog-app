const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// App config
let app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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
    type: Date,
    default: new Date(),
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

// edit
app.get("/blogs/:id/edit", function (req, res) {
  Blog.findById({ _id: req.params.id }, function (err, foundBlog) {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

// update
app.put("/blogs/:id", function (req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (
    err,
    updatedBlog
  ) {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// delete
app.delete("/blogs/:id", function (req, res) {
  Blog.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
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
