const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mongoDBUri } = require("./Extras/secrets");
const { collegeSchema } = require("./Extras/schemas");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Models

const College = mongoose.model("College", collegeSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/signin", (req, res) => {
  res.render("signin");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/college/:collegeId/", (req, res) => {
  const profileURL = "/college/" + req.params.collegeId + "/profile";
  res.render("college", {
    collegeId: req.params.collegeId,
    profileURL: profileURL,
  });
});
app.get("/college/:collegeId/profile", (req, res) => {
  College.findById({ _id: req.params.collegeId }, (err, college) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("college-profile", {
        name: college.name,
        city: college.city,
        state: college.state,
        pin: college.pinCode,
        type: college.type,
        website: college.website,
      });
    }
  });
});

app.post("/signin", (req, res) => {
  // Login for an Existing User
  console.log(req.body.email, req.body.password, req.body.userType);
  if (req.body.userType === "college") {
    College.findOne({ email: req.body.email }, (err, college) => {
      if (err) {
        return console.log(err);
      } else {
        if (!college) {
          console.log("User not found");
          res.render("signin");
        } else if (college.password === req.body.password) {
          res.redirect("/college/" + college._id + "/");
        } else {
          console.log("Incorrect password");
          res.render("signin");
        }
      }
    });
  }
});
app.post("/signup", (req, res) => {
  // SignIn for a New User
  console.log(req.body.email, req.body.password, req.body.userType);
  if (req.body.userType === "college") {
    const college = new College({
      email: req.body.email,
      password: req.body.password,
    });
    college.save();
    res.redirect("/signin");
  }
});

app.listen(3000, () => {
  console.log("App started at port 3000");
});
