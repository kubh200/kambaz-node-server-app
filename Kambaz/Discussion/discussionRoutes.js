import {
    createDiscussion,
    findDiscussionsByAnswer,
    findDiscussionById,
    updateDiscussion,
    deleteDiscussion,
    findDiscussionsWithRepliesForAnswer,
  } from "./discussionsDao.js";
import replyModel from "../Replies/FollowUpReplyModel.js"
export default function DiscussionRoutes(app) {
  app.post("/api/pazza/answers/:aid/discussions", async (req, res) => {
    try {
      const discussion = await createDiscussion({
        answer: req.params.aid,
        ...req.body,
      });
      res.json(discussion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/pazza/answers/:aid/discussions", async (req, res) => {
    const result = await findDiscussionsWithRepliesForAnswer(req.params.aid);
    res.json(result);
  });

  // app.get("/api/pazza/answers/:aid/discussions", async (req, res) => {
  //   try {
  //     const discussions = await findDiscussionsByAnswer(req.params.aid);
  //     res.json(discussions);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });

  app.put("/api/pazza/discussions/:did", async (req, res) => {
    try {
      const updated = await updateDiscussion(req.params.did, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/pazza/discussions/:did", async (req, res) => {
    try {
      const discussionId = req.params.did;
      console.log("Deleting discussion and replies for ID:", discussionId);
      await replyModel.deleteMany({ discussion: discussionId });
      await deleteDiscussion(discussionId);
      res.sendStatus(204);
    } catch (err) {
      console.error("🔥 Failed to delete discussion and replies:", err);
      res.status(500).json({ error: err.message });
    }
  });
}