const { StatusCodes } = require("http-status-codes");
const { startSession } = require("mongoose");
const Enrollment = require("./enrollment.model");
const EnrollmentService = require("./enrollment.service");

const BadRequestError = require("../error/error.classes/BadRequestError");
const InternalServerError = require("../error/error.classes/InternalServerError");
const NotFoundError = require("../error/error.classes/NotFoundError");

// Create a new enrollment
const CreateEnrollment = async (req, res, next) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const { courseId } = req.body;
    const userId = req.user.id; // Assuming req.user contains the authenticated user's ID

    if (!userId || !courseId) {
      throw new BadRequestError("User ID and Course ID are required");
    }

    const enrollmentData = {
      studentId: userId,
      courseId,
    };

    const enrollment = new Enrollment(enrollmentData);
    const createdEnrollment = await EnrollmentService.save(enrollment, session);

    await session.commitTransaction();

    res.status(StatusCodes.CREATED).json({
      message: "Enrollment created successfully",
      enrollment: createdEnrollment,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};



// Get all enrollments
const GetAllEnrollments = async (req, res, next) => {
  try {
    const enrollments = await EnrollmentService.findAll();
    res.status(StatusCodes.OK).json(enrollments);
  } catch (error) {
    next(new InternalServerError(error.message));
  }
};

// Get an enrollment by ID
const GetEnrollmentById = async (req, res, next) => {
  try {
    const enrollmentId = req.params.id;
    const enrollment = await EnrollmentService.findById(enrollmentId);
    if (!enrollment) {
      throw new NotFoundError("Enrollment not found");
    }
    res.status(StatusCodes.OK).json(enrollment);
  } catch (error) {
    next(error);
  }
};

// Update an enrollment by ID
const UpdateEnrollment = async (req, res, next) => {
  try {
    const enrollmentId = req.params.id;
    const updatedEnrollment = await EnrollmentService.findByIdAndUpdate(
      enrollmentId,
      req.body
    );
    if (!updatedEnrollment) {
      throw new NotFoundError("Enrollment not found");
    }
    res.status(StatusCodes.OK).json({
      message: "Enrollment updated successfully",
      enrollment: updatedEnrollment,
    });
  } catch (error) {
    next(error);
  }
};

// Delete an enrollment by ID
const DeleteEnrollment = async (req, res, next) => {
  try {
    const enrollmentId = req.params.id;
    const deletedEnrollment = await EnrollmentService.findByIdAndDelete(
      enrollmentId
    );
    if (!deletedEnrollment) {
      throw new NotFoundError("Enrollment not found");
    }
    res.status(StatusCodes.OK).json({
      message: "Enrollment deleted successfully",
      enrollment: deletedEnrollment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateEnrollment,
  GetAllEnrollments,
  GetEnrollmentById,
  UpdateEnrollment,
  DeleteEnrollment,
};
