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
const { response } = require("express");

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
app.get("/signup/college/", (req, res) => {
  res.render("signup-college");
});
app.get("/signup/faculty/", (req, res) => {
  res.render("signup-faculty");
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
  Job.find({ postedBy: req.params.collegeId }, (err, foundJobs) => {
    if (err) {
      return console.log(err);
    } else {
      const jobs = [];
      foundJobs.forEach((job) => {
        const obj = {
          designation: job.designation,
          minimumQualification: job.minimumQualification,
          jobDescription: job.jobDescription,
          professorUnder: job.professorUnder,
        };
        jobs.push(obj);
      });
      res.render("college-your-job-vacancies", { jobs: jobs });
    }
  });
});
// Faculty
app.get("/faculty/:facultyId/", (req, res) => {
  const profileURL = "/faculty/" + req.params.facultyId + "/profile/";
  const yourApplicationsURL =
    "/faculty/" + req.params.facultyId + "/your-applications/";
  const vacanciesURL = "/faculty/" + req.params.facultyId + "/job-vacancies/";
  res.render("faculty", {
    facultyId: req.params.facultyId,
    profileURL: profileURL,
    yourApplicationsURL: yourApplicationsURL,
    vacanciesURL: vacanciesURL,
  });
});
app.get("/faculty/:facultyId/profile/", (req, res) => {
  Faculty.findById({ _id: req.params.facultyId }, (err, foundUser) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("faculty-profile", {
        name: foundUser.name,
        about: foundUser.about,
      });
    }
  });
});
app.get("/faculty/:facultyId/your-applications/", (req, res) => {
  res.render("faculty-your-applications");
});

const convertToVacancy = (job) => {
  const vacancy = {
    designation: job.designation,
    minimumQualification: job.minimumQualification,
    jobDescription: job.jobDescription,
    professorUnder: job.professorUnder,
    collegeName: job.college.name,
    collegeWebsite: job.college.website,
  };
  return vacancy;
};

app.get("/faculty/:facultyId/job-vacancies/", (req, res) => {
  Job.find({}, (err, jobs) => {
    const vacancies = [];
    jobs.forEach((job) => {
      vacancies.push(convertToVacancy(job));
    });
    res.render("job-vacancies", { vacancies: vacancies });  
  });
});

app.post("/signin/", (req, res) => {
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
app.post("/signup/", (req, res) => {
  // SignUp for a New User
  if (req.body.userType === "college") {
    res.redirect("/signup/college/");
  } else if (req.body.userType === "faculty") {
    res.redirect("/signup/faculty/");
  } else {
    res.redirect("/signup/");
  }
});
app.post("/signup/college/", (req, res) => {
  // SignUp for a New User
  // console.log(req.body.email, req.body.password, req.body.userType);
  College.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return console.log(err);
    } else if (!foundUser) {
      //user not found
      const college = new College({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        pinCode: req.body.pin,
        type: req.body.type,
        website: req.body.website,
      });
      college.save();
      res.redirect("/signin");
    } else {
      console.log("College Already Exist");
      res.redirect("/signin");
    }
  });
});
app.post("/signup/faculty", (req, res) => {
  Faculty.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return console.log(err);
    } else if (!foundUser) {
      //user not found
      const faculty = new Faculty({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        about: req.body.about,
      });
      faculty.save();
      res.redirect("/signin");
    } else {
      console.log("Faculty Already Exist");
      console.log(foundUser);
      res.redirect("/signin");
    }
  });
});
// College
app.post("/college/:collegeId/add-job-vacancy/", (req, res) => {
  College.findById({ _id: req.params.collegeId }, (err, college) => {
    if (err) return console.log(err);
    const job = new Job({
      designation: req.body.designation,
      minimumQualification: req.body.minimumQualification,
      jobDescription: req.body.jobDescription,
      professorUnder: req.body.professorUnder,
      postedBy: req.params.collegeId,
      college: college,
    });
    job.save();
    const redirectURL = "/college/" + req.params.collegeId + "/";
    res.redirect(redirectURL);
  });
});

app.listen(3000, () => {
  console.log("App started at port 3000");
});
