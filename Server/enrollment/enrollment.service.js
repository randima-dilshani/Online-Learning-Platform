const Enrollment = require("./enrollment.model");

const save = async (enrollment, session) => {
  return await enrollment.save({ session });
};

const findAll = async (queryObj) => {
 // console.log("queryObj", queryObj);
  return await Enrollment.find(queryObj)
  
    .populate("studentId", "userName email") // Populate studentId with name and email fields
    .populate("courseId", "courseName courseTitle") // Populate courseId with name and description fields
    .sort({ createdAt: -1 });
    
};

const findById = async (id) => {
  return await Enrollment.findById(id).populate("studentId courseId");
};

const findByIdAndUpdate = async (id, update, session) => {
  if (session) {
    return await Enrollment.findByIdAndUpdate(id, update, {
      new: true,
    }).session(session);
  } else {
    return await Enrollment.findByIdAndUpdate(id, update, { new: true });
  }
};

const findByIdAndDelete = async (id, session) => {
  if (session) {
    return await Enrollment.findByIdAndDelete(id).session(session);
  } else {
    return await Enrollment.findByIdAndDelete(id);
  }
};

module.exports = {
  save,
  findAll,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
};
