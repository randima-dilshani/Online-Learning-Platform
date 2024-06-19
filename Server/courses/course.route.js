const express = require("express");
const courseController = require("./course.controller");
const multer = require("multer");

const CourseRouter = express.Router();

const upload = multer({ dest: "uploads/" });

// Route for creating a course
CourseRouter.post("/createCourse", upload.single("image"),courseController.CreateCourse);

// Route for getting all courses
CourseRouter.get("/getAllCourses", courseController.GetAllCourses);

// Route for getting a course by ID
CourseRouter.get("/getCourse/:id", courseController.GetCourseById);

// Route for updating a course by ID
CourseRouter.put("/updateCourse/:id", courseController.UpdateCourse);

// Route for deleting a course by ID
CourseRouter.delete("/deleteCourse/:id", courseController.DeleteCourse);

module.exports = CourseRouter;
