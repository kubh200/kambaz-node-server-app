import {
  createReply,
  findRepliesForAnswer,
  updateReply,
  deleteReply,
} from './followupReplyDao.js';

export default function FollowupReplyRoutes(app) {
  app.post("/api/pazza/discussions/:did/replies", async (req, res) => {
    try {
      const reply = await createReply({
        // answer: req.params.did,
        author: req.body.author,
        authorRole: req.body.authorRole,
        authorName: req.body.authorName,
        content: req.body.content,
        parentReply: req.body.parentReply || null,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        discussion: req.params.did
      });
      res.json(reply);
    } catch (err) {
      console.error("🔥 Error creating reply:", err); // ADD THIS
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/pazza/discussions/:did/replies", async (req, res) => {
    try {
      const replies = await findRepliesForAnswer(req.params.aid);
      res.json(replies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/pazza/replies/:rid", async (req, res) => {
    try {
      const updated = await updateReply(req.params.rid, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/pazza/replies/:rid", async (req, res) => {
    try {
      await deleteReply(req.params.rid);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}