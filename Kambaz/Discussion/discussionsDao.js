import DiscussionModel from "./discussionsModel.js";
import ReplyModel from "../Replies/FollowUpReplyModel.js";
import { v4 as uuidv4 } from "uuid";

export const createDiscussion = async (discussionData) => {
  const discussionWithId = {
    _id: uuidv4(),
    resolved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...discussionData,
  };
  return await DiscussionModel.create(discussionWithId);
};

export const findDiscussionsByAnswer = async (answerId) => {
  return await DiscussionModel.find({ answer: answerId });
};

export const findDiscussionById = async (id) => {
  return await DiscussionModel.findById(id);
};

export const updateDiscussion = async (id, updates) => {
  updates.updatedAt = new Date();
  return await DiscussionModel.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteDiscussion = async (id) => {
  return await DiscussionModel.findByIdAndDelete(id);
};

export const findDiscussionsWithRepliesForAnswer = async (answerId) => {
  // Step 1: Fetch all discussions for this answer
  const discussions = await DiscussionModel.find({ answer: answerId }).lean();

  // Step 2: Get all replies related to these discussions
  const discussionIds = discussions.map(d => d._id);
  const replies = await ReplyModel.find({ discussion: { $in: discussionIds } }).lean();

  // Step 3: Group replies by discussion ID
  const repliesMap = {};
  for (const reply of replies) {
    if (!repliesMap[reply.discussion]) {
      repliesMap[reply.discussion] = [];
    }
    repliesMap[reply.discussion].push(reply);
  }

  // Step 4: Attach replies to their corresponding discussion
  const discussionsWithReplies = discussions.map(disc => ({
    ...disc,
    replies: repliesMap[disc._id] || [],
  }));

  return discussionsWithReplies;
};