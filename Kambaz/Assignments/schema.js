import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String,
  title: String,
  description: String,
  points: Number,
  dueDate: String,
  availableFrom: String,
  availableUntil: String,
  course: {
    type: String,
    ref: "CourseModel" // ✅ This is required for populate to work
  }
}, {
  collection: "assignments"
});

export default assignmentSchema;