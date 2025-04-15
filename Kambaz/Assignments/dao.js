// import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import AssignmentModel from "./model.js";

// 1. Find all assignments for a course
export const findAssignmentsForCourse = async (courseId) => {
  return AssignmentModel.find({ course: courseId }).populate("course");
};

// 2. Create a new assignment in a course
export const createAssignment = async (courseId, assignment) => {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(), // or use Mongo's default ObjectId if preferred
    course: courseId,
  };
  return AssignmentModel.create(newAssignment);
};

// 3. Update an assignment by ID
export const updateAssignment = async (assignmentId, updates) => {
  await AssignmentModel.updateOne({ _id: assignmentId }, { $set: updates });
  return AssignmentModel.findById(assignmentId).populate("course"); // return the updated document
};

// 4. Delete an assignment by ID
export const deleteAssignment = async (assignmentId) => {
  return AssignmentModel.deleteOne({ _id: assignmentId });
};
// export const findAssignmentsForCourse = (courseId) => {
//   return Database.assignments.filter((a) => a.course === courseId);
// };

// export const createAssignment = (courseId, assignment) => {
//   const newAssignment = {
//     ...assignment,
//     _id: uuidv4(),
//     course: courseId,
//   };
//   Database.assignments.push(newAssignment);
//   return newAssignment;
// };

// export const updateAssignment = (assignmentId, updates) => {
//   const assignment = Database.assignments.find((a) => a._id === assignmentId);
//   if (!assignment) return null;
//   Object.assign(assignment, updates);
//   return assignment;
// };

// export const deleteAssignment = (assignmentId) => {
//   Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
// };
