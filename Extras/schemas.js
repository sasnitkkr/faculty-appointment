const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const collegeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  pinCode: { type: Number, default: "" },
  type: { type: String, default: "" },
  website: { type: String, default: "" },
});

const jobSchema = new mongoose.Schema({
  designation: { type: String, default: "" },
  minimumQualification: { type: String, default: "" },
  jobDescription: { type: String, default: "" },
  professorUnder: { type: String, default: "" },
  postedBy: { type: ObjectId, default: "" },
  college: { type: collegeSchema },
});

const facultySchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  about: { type: String, default: "" },
});

const applicationSchema = new mongoose.Schema({
  status: { type: Boolean, default: false },
  faculty: { type: facultySchema },
  job: { type: jobSchema },
  facultyId: { type: ObjectId, ref: "Faculty" },
  jobId: { type: ObjectId, ref: "Job" },
}); 

module.exports = {
  collegeSchema: collegeSchema,
  facultySchema: facultySchema,
  jobSchema: jobSchema,
  applicationSchema: applicationSchema,
};
