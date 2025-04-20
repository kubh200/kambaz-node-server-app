import mongoose from "mongoose";

const foldersSchema = new mongoose.Schema({
  _id: String,             // e.g., "hw1", "logistics"
  name: String,            // e.g., "HW1", "Logistics"
  course: String           // courseId like "RS101"
}, { collection: "folders" });

export default foldersSchema;
