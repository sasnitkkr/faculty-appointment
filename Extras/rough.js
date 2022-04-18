[
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
foundJobs.forEach((job) => {
  console.log(job);
  const college = await College.findById(job.postedBy).exec(); 
  if (!college) {
    return console.log(err);
  } else {
    console.log(college);
    const collegeName = college.name;
    const collegeWebsite = college.website;
    const vacancy = {
      designation: job.designation,
      minimumQualification: job.minimumQualification,
      jobDescription: job.jobDescription,
      professorUnder: job.professorUnder,
      collegeName: collegeName,
      collegeWebsite: collegeWebsite,
    };
    console.log(vacancy);
    vacancies.push(vacancy);
    console.log(vacancies);
  } 
});
const findCollegeByIdCallback = (err, college) => {
  if(err){
    return console.log(err);
  }
  console.log(college);
  const collegeName = college.name;
  const collegeWebsite = college.website;
  const vacancy = {
    designation: job.designation,
    minimumQualification: job.minimumQualification,
    jobDescription: job.jobDescription,
    professorUnder: job.professorUnder,
    collegeName: collegeName,
    collegeWebsite: collegeWebsite,
  };
  console.log(vacancy);
  vacancies.push(vacancy);
  console.log(vacancies);
}
const forEachCallback = (job) => {
  console.log(job);
  College.findById({_id: job.postedBy}, findCollegeByIdCallback);
}
const findJobCallback = (err, foundJobs) => {
  const vacancies = [];
  if (err) {
    return console.log(err);
  } else {
    console.log("entered else inside f/fid/vac");
    console.log(foundJobs);
    foundJobs.forEach(forEachCallback);
  }
  res.render("job-vacancies", { vacancies: vacancies });
}

app.get("/faculty/:facultyId/job-vacancies/", (req, res) => {
  Job.find({}, findJobCallback);
});

// app.get("/faculty/:facultyId/job-vacancies/", (req, res) => {
//   Job.find({}, (err, foundJobs) => {
//     const vacancies = [];
//     if (err) {
//       return console.log(err);
//     } else {
//       console.log("entered else inside f/fid/vac");
//       console.log(foundJobs);
//       foundJobs.forEach((job) => {
//         console.log(job);
//         College.findById({ _id: job.postedBy }, (err, college) => {
//           if (err) {
//             return console.log(err);
//           }
//           console.log(college);
//           const collegeName = college.name;
//           const collegeWebsite = college.website;
//           const vacancy = {
//             designation: job.designation,
//             minimumQualification: job.minimumQualification,
//             jobDescription: job.jobDescription,
//             professorUnder: job.professorUnder,
//             collegeName: collegeName,
//             collegeWebsite: collegeWebsite,
//           };
//           console.log(vacancy);
//           vacancies.push(vacancy);
//           console.log(vacancies);
//         });
//       });
//     }
//     res.render("job-vacancies", { vacancies: vacancies });
//   });
// });

app.get("/faculty/:facultyId/job-vacancies/", (req, res) => {
  Job.find({}, (err, foundJobs)=>{
    if(err){
      return console.log(err);
    }
    res.render("job-vacancies", { vacancies: foundJobs });
  })
});

app.get("/faculty/:facultyId/job-vacancies/", (req, res) => {
  Job.find({}, (err, foundJobs)=>{
    if(err){
      return console.log(err);
    }
    const vacancies = [];
    foundJobs.forEach((job)=>{
      const college = await College.findById(job.postedBy);
      const collegeName = college.name;
      const collegeWebsite = college.website;
      const vacancy = {
        designation: job.designation,
        minimumQualification: job.minimumQualification,
        jobDescription: job.jobDescription,
        professorUnder: job.professorUnder,
        collegeName: collegeName,
        collegeWebsite: collegeWebsite,
      };
      vacancies.push(vacancy);
    });
    res.render("job-vacancies", { vacancies: foundJobs });
  });
});


app.get("/faculty/:facultyId/job-vacancies/", (req, res) => {
  Job.find({}, (err, foundJobs) => {
    const vacancies = [];
    if (err) {
      return console.log(err);
    } else {
      console.log("entered else inside f/fid/vac");
      console.log(foundJobs);
      foundJobs.forEach((job) => {
        console.log(job);
        College.findById({ _id: job.postedBy }, (err, college) => {
          if (err) {
            return console.log(err);
          }
          console.log(college);
          const collegeName = college.name;
          const collegeWebsite = college.website;
          const vacancy = {
            designation: job.designation,
            minimumQualification: job.minimumQualification,
            jobDescription: job.jobDescription,
            professorUnder: job.professorUnder,
            collegeName: collegeName,
            collegeWebsite: collegeWebsite,
          };
          console.log(vacancy);
          vacancies.push(vacancy);
          console.log(vacancies);
        });
      });
    }
    res.render("job-vacancies", { vacancies: vacancies });
  });
});