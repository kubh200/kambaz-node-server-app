import postsModel from "./postsModel.js";
import { v4 as uuidv4 } from 'uuid';

export const findPostsByCourse = async (courseId) =>
  await postsModel.find({ course: courseId });

export const createPost = async (post) => {
  const postWithId = {
    ...post,
    _id: uuidv4(),
    views: []
  };
  return await postsModel.create(postWithId);
}

export const updatePost = (postId, postUpdates) => {
  return postsModel.findByIdAndUpdate(postId, postUpdates, { new: true });
};

export const deletePost = async (postId) =>
  await postsModel.deleteOne({ _id: postId });

export const incrementView = async (postId) =>
  await postsModel.findByIdAndUpdate(postId, { $inc: { views: 1 } }, { new: true });

export const findById = async (postId) => {
  return await postsModel.findById(postId);
};
