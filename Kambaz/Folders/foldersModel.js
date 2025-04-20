import mongoose from "mongoose";
import foldersSchema from "./foldersSchema.js";

const foldersModel = mongoose.model("folders", foldersSchema);
export default foldersModel;
