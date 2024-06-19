const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const Course = require("./course.model");
const CourseService = require("./course.service");
const User = require("../user/user.model");
const path = require("path");
const multer = require("multer");

// Create a new course
const CreateCourse = async (req, res) => {
  const session = await startSession();
  try {
    //start transaction
    session.startTransaction();
    // Extract data from the request body
    const { courseName, courseTitle , courseCode, courseDescription, user } = req.body;

    let imagePath = "";
    if (req.file) {
      imagePath = path.join("uploads", req.file.filename);
    }
 

    // Construct course data object
    const courseData = {
        courseName:  courseName,
        courseTitle:  courseTitle,
        courseCode: courseCode,
        image: imagePath,
        courseDescription: courseDescription,
        user: user,
    };

    // Create a new course instance with the constructed course data
    const course = new Course(courseData);

    // Save the course to the database
    const createdCourse = await CourseService.save(course, session); // Add await here

    // Commit the transaction
    await session.commitTransaction();

    // Send response
    res.status(StatusCodes.CREATED).json({
      message: "Course created successfully",
      course: createdCourse,
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    //end session
    session.endSession();
  }
};

// Get all courses
const GetAllCourses = async (req, res) => {
  try {
    const courses = await CourseService.findAll();
    res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Get a course by ID
const GetCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await CourseService.findById(courseId);
    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Course not found" });
    }
    res.status(StatusCodes.OK).json(course);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

//Update a Course by ID
const UpdateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await CourseService.findByIdAndUpdate(courseId, req.body);
    if (!updatedCourse) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Course not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Delete a course by ID
const DeleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await CourseService.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Course not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Course deleted successfully", course: deletedCourse });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Function to get all user usernames
const getAllUsernames = async (req, res) => {
  try {
    const users = await User.find({}, { userName: 1 }); // Fetch only the username field
    const usernames = users.map((user) => user.userName); // Extract usernames
    res.status(StatusCodes.OK).json(usernames);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  CreateCourse,
  GetAllCourses,
  GetCourseById,
  UpdateCourse,
  DeleteCourse,
  getAllUsernames,
};
