const Course = require("./course.model");

/**
 * Save a new course
 * @param {Object} course - The course object to save
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Course>} - The saved course
 */
const save = async (course, session) => {
  return await course.save({ session });
};

/**
 * Find all courses based on query object
 * @param {Object} queryObj - The query object for filtering courses (optional)
 * @returns {Promise<Course[]>} - Array of courses
 */
const findAll = async (queryObj) => {
  return await Course.find(queryObj).sort({ createdAt: -1 });
};

/**
 * Find a course by its id
 * @param {string} id - The id of the course
 * @returns {Promise<Course>} - The course object
 */
const findById = async (id) => {
  return await Course.findById(id);
};

/**
 * Find a course by its ID and update it
 * @param {string} id - The ID of the course to update
 * @param {Object} update - The update object
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Course>} - The updated course
 */
const findByIdAndUpdate = async (id, update, session) => {
  if (session) {
    return await Course.findByIdAndUpdate(id, update, { new: true }).session(
      session
    );
  } else {
    return await Course.findByIdAndUpdate(id, update, { new: true });
  }
};

/**
 * Find a course by its ID and delete it
 * @param {string} id - The ID of the course to delete
 * @param {Object} session - The session object for transactions (optional)
 * @returns {Promise<Course>} - The deleted course
 */
const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await Course.findByIdAndDelete(id).session(session);
  } else {
    return await Course.findByIdAndDelete(id);
  }
};
const findCourseByDueDate = async (dueDate) => {
  return await Course.find({ dueDate: dueDate })
    .populate("user")
    .select("-password");
};

module.exports = {
  save,
  findAll,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findCourseByDueDate,
};
