const mongoose = require("mongoose");
const collegeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  pinCode: { type: String, default: "" },
  type: { type: String, default: "" },
  website: { type: String, default: "" },
  jobVacancy: [
    {
      designation: { type: String, default: "" },
      minimumQualification: { type: String, default: "" },
      jobDescription: { type: String, default: "" },
      professorUnder: { type: String, default: "" },
      applicants: [
        {
          professorId: { type: String, default: "" },
          status: { type: Boolean, default: false },
        },
      ],
    }
  ],
});

module.exports = {
  collegeSchema: collegeSchema,
};
