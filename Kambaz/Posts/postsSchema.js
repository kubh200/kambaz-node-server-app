import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  _id: String,
  summary: String,
  details: String,
  type: String,
  author: String,
  authorRole: String,
  course: String,
  folders: [String],
  visibility: String,
  visibleTo: [String],
  createdAt: String,
  updatedAt: String,
  views: { type: [String], default: [] },
  answers: [{ type: String, ref: "Answer" }]
}, { collection: "posts" });

export default postsSchema;
