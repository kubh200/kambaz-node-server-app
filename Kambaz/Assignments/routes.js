import {
  findAssignmentsForCourse,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "./dao.js";
export default function AssignmentRoutes(app) {
  // GET all assignments for a course
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (err) {
      console.error("❌ Failed to get assignments:", err);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  });

  // POST new assignment in a course
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const { courseId } = req.params;
      const newAssignment = await createAssignment(courseId, req.body);
      res.json(newAssignment);
    } catch (err) {
      console.error("❌ Failed to create assignment:", err);
      res.status(500).json({ error: "Failed to create assignment" });
    }
  });

  // PUT update assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const updated = await updateAssignment(assignmentId, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.json(updated);
    } catch (err) {
      console.error("❌ Failed to update assignment:", err);
      res.status(500).json({ error: "Failed to update assignment" });
    }
  });

  // DELETE assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      await deleteAssignment(req.params.assignmentId);
      res.sendStatus(204);
    } catch (err) {
      console.error("❌ Failed to delete assignment:", err);
      res.status(500).json({ error: "Failed to delete assignment" });
    }
  });
}
  // export default function AssignmentRoutes(app) {
  //   app.get("/api/courses/:courseId/assignments", (req, res) => {
  //     const { courseId } = req.params;
  //     const courseAssignments = findAssignmentsForCourse(courseId);
  //     res.json(courseAssignments);
  //   });
  
  //   app.post("/api/courses/:courseId/assignments", (req, res) => {
  //     const { courseId } = req.params;
  //     const newAssignment = createAssignment(courseId, req.body);
  //     res.json(newAssignment);
  //   });
  
  //   app.put("/api/assignments/:assignmentId", (req, res) => {
  //     const { assignmentId } = req.params;
  //     const updated = updateAssignment(assignmentId, req.body);
  //     if (!updated) {
  //       return res.status(404).json({ message: "Assignment not found" });
  //     }
  //     res.json(updated);
  //   });
  
  //   app.delete("/api/assignments/:assignmentId", (req, res) => {
  //     deleteAssignment(req.params.assignmentId);
  //     res.sendStatus(204);
  //   });
  // }
  