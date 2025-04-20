import {
    createAnswer,
    findAnswersByPost,
    findAnswerById,
    updateAnswer as daoUpdateAnswer,
    deleteAnswer as daoDeleteAnswer,
} from './answersDao.js';
import { updatePost } from "../Posts/postsDao.js"

export default function AnswerRoutes(app) {
  // Create new answer for a post
  app.post('/api/pazza/posts/:pid/answers', async (req, res) => {
    try {
        
        console.log("📥 Incoming Answer:", req.body);
        const answer = await createAnswer({
        post: req.params.pid,
        author: req.body.author,
        authorRole: req.body.authorRole,
        authorName: req.body.authorName,
        content: req.body.content,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
      });
      // add the answer to the post’s answers array
      await updatePost(req.params.pid, {
        $push: { answers: answer._id }
      });
      res.json(answer);
    } catch (err) {
        console.error("❌ Error creating answer:", err);
        res.status(500).json({ error: err.message });
    }
  });

  // Get all answers for a post
  app.get('/api/pazza/posts/:pid/answers', async (req, res) => {
    try {
      const answers = await findAnswersByPost(req.params.pid);
      res.json(answers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Get a single answer by ID
  app.get('/api/pazza/answers/:aid', async (req, res) => {
    try {
      const answer = await findAnswerById(req.params.aid);
      res.json(answer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Update an existing answer
  app.put('/api/pazza/answers/:aid', async (req, res) => {
    try {
      const updated = await daoUpdateAnswer(req.params.aid, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Delete an answer
  // app.delete('/api/pazza/answers/:aid', async (req, res) => {
  //   try {
  //     await daoDeleteAnswer(req.params.aid);
  //     res.sendStatus(204);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
  app.delete('/api/pazza/answers/:aid', async (req, res) => {
    try {
      const answerId = req.params.aid;
      console.log("🔎 Looking for answer with ID:", answerId);
  
      const answer = await findAnswerById(answerId);
      if (!answer) {
        console.warn("⚠️ Could not find answer with ID:", answerId);
        return res.status(404).json({ error: "Answer not found" });
      }
  
      console.log("🧼 Found answer, deleting...");
      await daoDeleteAnswer(answerId);
  
      await updatePost(answer.post, { $pull: { answers: answerId } });
  
      res.sendStatus(204);
    } catch (err) {
      console.error("❌ Error deleting answer:", err);
      res.status(500).json({ error: err.message });
    }
  });
  // app.delete('/api/pazza/answers/:aid', async (req, res) => {
  //   try {
  //     const answer = await findAnswerById(req.params.aid);
  //     if (answer) {
  //       await updatePost(answer.post, { $pull: { answers: answer._id } });
  //     }
  //     await daoDeleteAnswer(req.params.aid);
  //     res.sendStatus(204);
  //   } catch (err) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
}
