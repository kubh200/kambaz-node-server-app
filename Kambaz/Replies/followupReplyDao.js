import ReplyModel from './FollowUpReplyModel.js';
import { v4 as uuid } from 'uuid';

// export const createReply = async (data) => ReplyModel.create({ ...data, _id: uuid() });
export const createReply = async (replyData) => {
  return await ReplyModel.create(replyData);
};
export const findRepliesForAnswer = async (answerId) => ReplyModel.find({ answer: answerId });
export const deleteReply = async (replyId) => ReplyModel.findByIdAndDelete(replyId);
export const updateReply = async (replyId, updates) =>
  ReplyModel.findByIdAndUpdate(replyId, { ...updates, updatedAt: new Date() }, { new: true })
