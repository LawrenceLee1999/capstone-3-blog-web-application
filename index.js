import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let blogs = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

// create/submit blog
app.post("/submit", (req, res) => {
  const author = req.body["author"];
  const title = req.body["title"];
  const content = req.body["content"];
  const date = req.body["date"];
  const summary = req.body["summary"];

  const blogPost = {
    author: author,
    title: title,
    content: content,
    date: date,
    summary: summary,
  };

  blogs.push(blogPost);
  console.log(blogs);
  res.redirect("/");
});

// edit blog
app.get("/edit/:index", (req, res) => {
  const postIndex = req.params.index;
  const post = blogs[postIndex];

  if (post) {
    res.render("edit.ejs", { post: post, postIndex: postIndex });
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/edit/:index", (req, res) => {
  const postIndex = req.params.index;

  if (blogs[postIndex]) {
    blogs[postIndex].author = req.body["author"];
    blogs[postIndex].title = req.body["title"];
    blogs[postIndex].content = req.body["content"];
    blogs[postIndex].date = req.body["date"];
    blogs[postIndex].summary = req.body["summary"];
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

// delete blog
app.delete("/delete/:index", (req, res) => {
  const postIndex = req.params.index;

  if (blogs[postIndex]) {
    blogs.splice(postIndex, 1);
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
