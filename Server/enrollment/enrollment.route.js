const express = require("express");
const enrollmentController = require("./enrollment.controller");
const authMiddleware = require("../auth/auth.middleware");
const constants = require("../utill/constants")

const EnrollmentRouter = express.Router();

// Route for creating an enrollment
EnrollmentRouter.post(
  "/createEnrollment",
  authMiddleware.authorize([constants.USER.ROLES.ADMIN, constants.USER.ROLES.USER]),
  enrollmentController.CreateEnrollment
);

// Route for getting all enrollments
EnrollmentRouter.get(
  "/getAllEnrollments",
  enrollmentController.GetAllEnrollments
);

// Route for getting an enrollment by ID
EnrollmentRouter.get(
  "/getEnrollment/:id",
  enrollmentController.GetEnrollmentById
);

// Route for updating an enrollment by ID
EnrollmentRouter.put(
  "/updateEnrollment/:id",
  enrollmentController.UpdateEnrollment
);

// Route for deleting an enrollment by ID
EnrollmentRouter.delete(
  "/deleteEnrollment/:id",
  enrollmentController.DeleteEnrollment
);

module.exports = EnrollmentRouter;
