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
  res.send("Welcome");
});

// index
app.get("/blogs", function (req, res) {
  res.render("index");
});

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("App has started");
  }
});
