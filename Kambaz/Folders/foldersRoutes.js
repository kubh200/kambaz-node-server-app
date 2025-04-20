import * as dao from "./foldersDao.js";

export default function FolderRoutes(app) {
  app.get("/api/pazza/courses/:courseId/folders", async (req, res) => {
    const courseId = req.params.courseId;
    const folders = await dao.findFoldersByCourse(courseId);
    res.json(folders);
  });

  app.post("/api/pazza/folders", async (req, res) => {
    const folder = await dao.createFolder(req.body);
    res.json(folder);
  });

  app.put("/api/pazza/folders/:folderId", async (req, res) => {
    const status = await dao.updateFolder(req.params.folderId, req.body);
    res.json(status);
  });

  app.delete("/api/pazza/folders/:folderId", async (req, res) => {
    const status = await dao.deleteFolder(req.params.folderId);
    res.json(status);
  });
}
