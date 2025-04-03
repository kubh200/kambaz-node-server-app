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
}
