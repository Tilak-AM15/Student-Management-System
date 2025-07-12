const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  email: String
});

module.exports = mongoose.model("Teacher", teacherSchema);
