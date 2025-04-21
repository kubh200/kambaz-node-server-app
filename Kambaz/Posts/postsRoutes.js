import * as dao from "./postsDao.js";

export default function PostRoutes(app) {
  app.get("/api/pazza/courses/:courseId/posts", async (req, res) => {
    // const posts = await dao.findPostsByCourse(req.params.courseId);
    // res.json(posts);
    const courseId = req.params.courseId;
    const currentUser = req.session.currentUser;

    if (!currentUser?._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const allPosts = await dao.findPostsByCourse(courseId);

      const visiblePosts = allPosts.filter(post =>
        post.visibility === "ENTIRE_CLASS" ||
        post.visibleTo?.includes(currentUser._id) ||
        post.author === `${currentUser.firstName} ${currentUser.lastName}`
      );

      res.json(visiblePosts);
    } catch (err) {
      console.error("Error fetching course posts:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.get("/api/pazza/posts/:pid", async (req, res) => {
    // const post = await dao.findById(req.params.pid);
    // if (!post) return res.status(404).json({ error: "Post not found" });
    // res.json(post);
    const userId = req.session.currentUser?._id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const post = await dao.findById(req.params.pid);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // 🔐 Filter based on visibility
    if (post.visibility === "SELECTED_USERS" && !post.visibleTo?.includes(userId)) {
      return res.status(403).json({ error: "You are not authorized to view this post" });
    }

    res.json(post);
  });

  app.post("/api/pazza/posts", async (req, res) => {
    // const post = await dao.createPost(req.body);
    // res.json(post);
    const post = req.body;

    if (post.visibility === "SELECTED_USERS" && (!Array.isArray(post.visibleTo) || post.visibleTo.length === 0)) {
      return res.status(400).json({ error: "Must select users for SELECTED_USERS visibility" });
    }

    const created = await dao.createPost(post);
    res.json(created);
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
