import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const discussionSchema = new mongoose.Schema({
  _id: { type: String, default: uuid }, // UUID
  answer: { type: String, required: true }, // answer UUID
  author: { type: String, required: true },
  authorName: { type: String },
  authorRole: { type: String, enum: ['STUDENT', 'FACULTY', 'TA', 'ADMIN'] },
  content: { type: String, required: true },
  resolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { 
  collection: "discussions" 
});

export default mongoose.model("Discussion", discussionSchema);