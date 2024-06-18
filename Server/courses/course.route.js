const express = require("express");
const courseController = require("./course.controller");

const CourseRouter = express.Router();

// Route for creating a course
CourseRouter.post("/createCourse", courseController.CreateCourse);

// Route for getting all courses
CourseRouter.get("/getAllCourses", courseController.GetAllCourses);

// Route for getting a course by ID
CourseRouter.get("/getCourse/:id", courseController.GetCourseById);

// Route for updating a course by ID
CourseRouter.put("/updateCourse/:id", courseController.UpdateCourse);

// Route for deleting a course by ID
CourseRouter.delete("/deleteCourse/:id", courseController.DeleteCourse);

module.exports = CourseRouter;
