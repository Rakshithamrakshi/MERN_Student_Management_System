const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  usn: String,
  branch: String
});

module.exports = mongoose.model("Student", studentSchema);