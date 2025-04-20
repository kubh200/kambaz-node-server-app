import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

const replySchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  discussion: { type: String, required: true },
  author: { type: String, required: true },
  authorRole: { type: String, required: true },
  authorName: { type: String },
  content: { type: String, required: true },
  parentReply: { type: String, default: null }, // For nested replies (optional)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { collection: 'replies' });

export default mongoose.model("Reply", replySchema);
