import AnswerModel from './answersModel.js';
import { v4 as uuid } from 'uuid';
export const createAnswer = async (answerData) => {
  return await AnswerModel.create({ ...answerData, _id: uuid() });
};

export const findAnswersByPost = async (postId) => {
  return await AnswerModel.find({ post: postId });
};

export const findAnswerById = async (answerId) => {
  // return await AnswerModel.findById(answerId);
  return await AnswerModel.findOne({ _id: answerId });
};

export const updateAnswer = async (answerId, update) => {
  return await AnswerModel.findByIdAndUpdate(
    answerId,
    { ...update, updatedAt: new Date() },
    { new: true }
  );
};

export const deleteAnswer = async (answerId) => {
  return await AnswerModel.findByIdAndDelete(answerId);
};
