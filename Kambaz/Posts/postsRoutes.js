import * as dao from "./postsDao.js";

export default function PostRoutes(app) {
  app.get("/api/pazza/courses/:courseId/posts", async (req, res) => {
    const posts = await dao.findPostsByCourse(req.params.courseId);
    res.json(posts);
  });

  app.get("/api/pazza/posts/:pid", async (req, res) => {
    const post = await dao.findById(req.params.pid);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  });

  app.post("/api/pazza/posts", async (req, res) => {
    const post = await dao.createPost(req.body);
    res.json(post);
  });

  app.put("/api/pazza/posts/:postId", async (req, res) => {
    const status = await dao.updatePost(req.params.postId, req.body);
    res.json(status);
  });

  app.delete("/api/pazza/posts/:postId", async (req, res) => {
    const status = await dao.deletePost(req.params.postId);
    res.json(status);
  });

  app.put("/api/pazza/posts/:id", async (req, res) => {
    try {
      const updatedPost = await dao.updatePost(req.params.id, req.body);
      res.json(updatedPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/pazza/posts/:pid/view", async (req, res) => {
    try {
      const postId = req.params.pid;
      const userId = req.session.currentUser?._id;
  
      if (!userId) return res.status(401).json({ error: "Not logged in" });
  
      const post = await dao.findById(postId);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      if (!post.views.includes(userId)) {
        post.views.push(userId);
        await post.save();
        console.log("✅ Added view for user", userId);
      } else {
        console.log("⏩ User already viewed this post");
      }
  
      res.sendStatus(200);
    } catch (err) {
      console.error("View increment error:", err);
      res.status(500).json({ error: err.message });
    }
  });
}
