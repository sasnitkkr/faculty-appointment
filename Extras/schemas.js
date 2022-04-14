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
});

const jobSchema = new mongoose.Schema({
  designation: { type: String, default: "" },
  minimumQualification: { type: String, default: "" },
  jobDescription: { type: String, default: "" },
  professorUnder: { type: String, default: "" },
  postedBy: { type: ObjectId, ref: "College" },
});

const facultySchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  about: { type: String, default: "" },
});

const applicationSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  appliedBy: {
    type: ObjectId,
    ref: "Faculty",
  },
  appliedFor: {
    type: ObjectId,
    ref: "Job",
  },
});

module.exports = {
  collegeSchema: collegeSchema,
  facultySchema: facultySchema,
  jobSchema: jobSchema,
  applicationSchema: applicationSchema,
};
