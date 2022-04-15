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


