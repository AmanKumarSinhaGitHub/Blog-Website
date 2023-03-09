const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to My Blog Website. Here is some tips to use this webiste. If you want to compose new post, just headover to the 'localhost:3000/compose'. Thanks a lot for spending some time in my blog post.. thank u so much";
const aboutContent = "Hey Welcome, This is a website that helps bloggers to post new content everyday. Thanks a lot for spending some time in my blog post website.. thank u so much";
const contactContent = "Email us on 'amankrsinha07@gmail.com'. Thanks a lot for spending some time in my blog post.. thank u so much";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const posts = [];

// Home Page
app.get("/", function (req, res) {
  res.render("home",
    {
      startingContent: homeStartingContent,
      userPost: posts
    });
})

// Routing for different Posts
app.get("/posts/:postName", function (req, res) {

  const requestedTitle = _.lowerCase(req.params.postName);

  let storedTitle;

  posts.forEach(post => {

    storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {

      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
})

// Contact Page
app.get("/contact", function (req, res) {
  res.render("contact", { contactDetails: contactContent });
})

// About Page
app.get("/about", function (req, res) {
  res.render("about", { aboutDetails: aboutContent });
})

// Compose Page
app.get("/compose", function (req, res) {
  res.render("compose");
})

// Composes new Posts
app.post("/compose", function (req, res) {

  const newPost = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  posts.push(newPost);

  res.redirect("/");
})




app.listen(3000, function () {
  console.log("Server started on port 3000");
});
