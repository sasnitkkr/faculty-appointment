const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signin", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.userType);
  res.send("signined");
});
app.post("/signup", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body.userType);
  res.send("signuped");
});

app.listen(3000, () => {
  console.log("App started at port 3000");
});
