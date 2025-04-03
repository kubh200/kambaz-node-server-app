// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";


// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// }

import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

// Enroll a user in a course (with duplication check)
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const exists = enrollments.find(e => e.user === userId && e.course === courseId);
  if (exists) return exists;

  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

// Unenroll a user from a course
export function unenrollUserFromCourse(userId, courseId) {
  Database.enrollments = Database.enrollments.filter(
    (e) => !(e.user === userId && e.course === courseId)
  );
}

// Get all enrollments for a user
export function findEnrollmentsForUser(userId) {
  return Database.enrollments.filter((e) => e.user === userId);
}
