import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// // Enroll a user in a course (with duplication check)
// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   const exists = enrollments.find(e => e.user === userId && e.course === courseId);
//   if (exists) return exists;

//   const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
//   enrollments.push(newEnrollment);
//   return newEnrollment;
// }

// // Unenroll a user from a course
// export function unenrollUserFromCourse(userId, courseId) {
//   Database.enrollments = Database.enrollments.filter(
//     (e) => !(e.user === userId && e.course === courseId)
//   );
// }

// // Get all enrollments for a user
// export function findEnrollmentsForUser(userId) {
//   return Database.enrollments.filter((e) => e.user === userId);
// }
export async function findCoursesForUser(userId) {
  console.log("🧠 Fetching enrolled courses for user:", userId);
  const enrollments = await model.find({ user: userId }).populate("course");
  console.log("📚 Enrolled courses found:", enrollments);
  return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
}
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
 
 