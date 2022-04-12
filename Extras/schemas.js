const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const collegeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  pinCode: { type: String, default: "" },
  type: { type: String, default: "" },
  website: { type: String, default: "" },
  jobVacancy: [{ type: ObjectId, ref: "Job" }],
});

const jobSchema = new mongoose.Schema({
  designation: { type: String, default: "" },
  minimumQualification: { type: String, default: "" },
  jobDescription: { type: String, default: "" },
  professorUnder: { type: String, default: "" },
  applicantions: [
    {
      status: { type: Boolean, default: false },
      appliedBy: { type: ObjectId, ref: "Professor" },
    }
  ],
});

const professorSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  applications: [{ type: ObjectId, ref: "Job" }],
});

module.exports = {
  collegeSchema: collegeSchema,
};
