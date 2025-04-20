import mongoose from "mongoose";
import postsSchema from "./postsSchema.js";

const postsModel = mongoose.model("posts", postsSchema);
export default postsModel;
