import foldersModel from "./foldersModel.js";
import { v4 as uuidv4 } from "uuid";

export const findFoldersByCourse = async (courseId) =>
  await foldersModel.find({ course: courseId });

export const createFolder = async (folder) => {
  const folderWithId = { ...folder, _id: uuidv4() }; // 🆕 Add _id
  return await foldersModel.create(folderWithId);
};

export const updateFolder = async (folderId, folder) =>
  await foldersModel.updateOne({ _id: folderId }, { $set: folder });

export const deleteFolder = async (folderId) =>
  await foldersModel.deleteOne({ _id: folderId });
