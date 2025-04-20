import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const enrollment = dao.enrollUserInCourse(user, course);
    res.json(enrollment);
  });

  app.delete("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    dao.unenrollUserFromCourse(user, course);
    res.sendStatus(204);
  });

  app.get("/api/users/:userId/enrollments", (req, res) => {
    const enrollments = dao.findEnrollmentsForUser(req.params.userId);
    res.json(enrollments);
  });

  app.post("/api/enrollments/cleanup", async (req, res) => {
    try {
      const result = await dao.cleanupInvalidEnrollments();
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Error cleaning up enrollments", error });
    }
  });
}
