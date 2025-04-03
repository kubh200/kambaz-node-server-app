import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAssignmentsForCourse = (courseId) => {
  return Database.assignments.filter((a) => a.course === courseId);
};

export const createAssignment = (courseId, assignment) => {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
    course: courseId,
  };
  Database.assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = (assignmentId, updates) => {
  const assignment = Database.assignments.find((a) => a._id === assignmentId);
  if (!assignment) return null;
  Object.assign(assignment, updates);
  return assignment;
};

export const deleteAssignment = (assignmentId) => {
  Database.assignments = Database.assignments.filter((a) => a._id !== assignmentId);
};
