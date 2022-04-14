const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { mongoDBUri } = require("./Extras/secrets");
const {
  collegeSchema,
  facultySchema,
  jobSchema,
  applicationSchema,
} = require("./Extras/schemas");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(mongoDBUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Models

const College = mongoose.model("College", collegeSchema);
const Faculty = mongoose.model("Faculty", facultySchema);
const Job = mongoose.model("Job", jobSchema);
const Application = mongoose.model("Application", applicationSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/signin/", (req, res) => {
  res.render("signin");
});
app.get("/signup/", (req, res) => {
  res.render("signup");
});

// College
app.get("/college/:collegeId/", (req, res) => {
  const profileURL = "/college/" + req.params.collegeId + "/profile/";
  const addJobVacancyURL =
    "/college/" + req.params.collegeId + "/add-job-vacancy/";
  const yourJobVacanciesURL =
    "/college/" + req.params.collegeId + "/your-job-vacancies/";
  res.render("college", {
    collegeId: req.params.collegeId,
    profileURL: profileURL,
    addJobVacancyURL: addJobVacancyURL,
    yourJobVacanciesURL: yourJobVacanciesURL,
  });
});
app.get("/college/:collegeId/profile/", (req, res) => {
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
app.get("/college/:collegeId/add-job-vacancy/", (req, res) => {
  const addJobVacancyURL =
    "/college/" + req.params.collegeId + "/add-job-vacancy/";
  res.render("college-add-job-vacancy", { addJobVacancyURL: addJobVacancyURL });
});
app.get("/college/:collegeId/your-job-vacancies/", (req, res) => {
  const jobs = [
    {
      designation: "Assistant Professor",
      minimumQualification: "M.Tech",
      jobDescription: "Required an Assistant Professor",
      professorUnder: "http://www.nitkkr.ac.in/comp_faculty_details.php?idd=52",
    },
    {
      designation: "Assistant Professor",
      minimumQualification: "M.Tech",
      jobDescription: "Required an Assistant Professor",
      professorUnder: "http://www.nitkkr.ac.in/comp_faculty_details.php?idd=52",
    },
  ];
  res.render("college-your-job-vacancies", { jobs: jobs });
});
// Faculty
app.get("/faculty/:facultyId/", (req, res) => {
  const profileURL = "/faculty/" + req.params.facultyId + "/profile/";
  const yourApplicationsURL =
    "/faculty/" + req.params.facultyId + "/your-applications/";
  const vacanciesURL = "/job-vacancies/";
  res.render("faculty", {
    facultyId: req.params.facultyId,
    profileURL: profileURL,
    yourApplicationsURL: yourApplicationsURL,
    vacanciesURL: vacanciesURL,
  });
});
app.get("/faculty/:facultyId/profile/", (req, res) => {
  res.render("faculty-profile");
});
app.get("/faculty/:facultyId/your-applications/", (req, res) => {
  res.render("faculty-your-applications");
});
app.get("/job-vacancies/", (req, res) => {
  res.render("job-vacancies");
});

app.post("/signin", (req, res) => {
  // Login for an Existing User
  // console.log(req.body.email, req.body.password, req.body.userType);
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
  } else if (req.body.userType === "faculty") {
    Faculty.findOne({ email: req.body.email }, (err, faculty) => {
      if (err) {
        return console.log(err);
      } else {
        if (!faculty) {
          console.log("User not found");
          res.render("signin");
        } else if (faculty.password === req.body.password) {
          res.redirect("/faculty/" + faculty._id + "/");
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
  } else if (req.body.userType === "faculty") {
    const faculty = new Faculty({});
    faculty.save();
    res.redirect("signin");
  }
});
// College
app.post("/college/:collegeId/add-job-vacancy/", (req, res) => {
  const job = new Job({
    designation: req.body.designation,
    minimumQualification: req.body.minimumQualification,
    jobDescription: req.body.jobDescription,
    professorUnder: req.body.professorUnder,
    postedBy: req.params.collegeId,
  });
  job.save();
  const redirectURL = "/college/" + req.params.collegeId + "/";
  res.redirect(redirectURL);
});

app.listen(3000, () => {
  console.log("App started at port 3000");
});
