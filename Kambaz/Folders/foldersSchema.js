import mongoose from "mongoose";

const foldersSchema = new mongoose.Schema({
  _id: String,             // may use uuid
  name: String,            // e.g., "HW1", "Logistics"
  course: String           // courseId like "RS101"
}, { collection: "folders" });

export default foldersSchema;
