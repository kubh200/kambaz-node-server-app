// import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
export function findAllCourses() {
  // return Database.courses;
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}
export function createCourse(course) {
  const newCourse = { ...course, _id: uuidv4() };
  return model.create(newCourse);
    // const newCourse = { ...course, _id: uuidv4() };
    // Database.courses = [...Database.courses, newCourse];
    // return newCourse;
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
 }
 
// export function deleteCourse(courseId) {
//     const { courses, enrollments } = Database;
//     Database.courses = courses.filter((course) => course._id !== courseId);
//     Database.enrollments = enrollments.filter(
//       (enrollment) => enrollment.course !== courseId
// );}
export function updateCourse(courseId, courseUpdates) {
  // const { courses } = Database;
  // const course = courses.find((course) => course._id === courseId);
  // if (!course) {
  //   console.log("❌ Course not found for update:", courseId);
  //   return null;
  // }
  // Object.assign(course, courseUpdates);
  // return course;
  return model.updateOne({ _id: courseId }, { $set: courseUpdates }).then(() => model.findById(courseId));;
}

  
  