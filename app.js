const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app");

let app = express();
app.use("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Welcome");
});

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("App has started");
  }
});
