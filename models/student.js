const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9A-Za-z]+$/ 
  },
  mail: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  name: {
    type: String,
    required: true
  },
  percent:{
    type: Number,
    required: true
  }
})

const Student = mongoose.model("student", studentSchema);
module.exports = Student;