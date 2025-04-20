import foldersModel from "./foldersModel.js";

export const findFoldersByCourse = async (courseId) =>
  await foldersModel.find({ course: courseId });

export const createFolder = async (folder) =>
  await foldersModel.create(folder);

export const updateFolder = async (folderId, folder) =>
  await foldersModel.updateOne({ _id: folderId }, { $set: folder });

export const deleteFolder = async (folderId) =>
  await foldersModel.deleteOne({ _id: folderId });
