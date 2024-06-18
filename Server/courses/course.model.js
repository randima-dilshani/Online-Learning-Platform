const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
{
  courseName: {
    type: String,
    maxlength: [1000, "Course name should not exceed 1000 characters!"],
    required: [true, "Course name is required!"],
  },
  courseTitle: {
    type: String,
    maxlength: [1000, "Course title should not exceed 1000 characters!"],
    required: [true, "Course title is required!"],
  },
  courseCode: {
    type: String,
    unique: true,
    maxlength: [20, "Course code should not exceed 20 characters!"],
    required: [true, "Course code is required!"],
  },
  courseImage: {
    type: String,
    required: [true, "Image is required"],
  },
  courseDescription: {
    type: String,
    maxlength: [10000, "Course description should not exceed 10000 characters!"],
    required: [true, "Course description is required!"],
  },
});

module.exports = mongoose.model('Course', CourseSchema);

