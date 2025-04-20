import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
const answerSchema = new mongoose.Schema({
//   post: { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true },
//   author: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },
    // post: { type: String, required: true },       // changed from ObjectId to String
    // author: { type: String, required: true },
    _id       : { type: String, default: uuid },   // <-- answer id
    post      : { type: String, required: true },  // post id (uuid)
    author    : { type: String, required: true },  // user id (uuid)
    authorRole: { type: String, enum: ['FACULTY', 'STUDENT', 'TA', 'ADMIN'], required: true },
    authorName: { type: String },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { collection: "answers" });

export default mongoose.model('Answer', answerSchema);