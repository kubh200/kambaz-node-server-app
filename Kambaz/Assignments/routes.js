import {
    findAssignmentsForCourse,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  } from "./dao.js";
  
  export default function AssignmentRoutes(app) {
    app.get("/api/courses/:courseId/assignments", (req, res) => {
      const { courseId } = req.params;
      const courseAssignments = findAssignmentsForCourse(courseId);
      res.json(courseAssignments);
    });
  
    app.post("/api/courses/:courseId/assignments", (req, res) => {
      const { courseId } = req.params;
      const newAssignment = createAssignment(courseId, req.body);
      res.json(newAssignment);
    });
  
    app.put("/api/assignments/:assignmentId", (req, res) => {
      const { assignmentId } = req.params;
      const updated = updateAssignment(assignmentId, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Assignment not found" });
      }
      res.json(updated);
    });
  
    app.delete("/api/assignments/:assignmentId", (req, res) => {
      deleteAssignment(req.params.assignmentId);
      res.sendStatus(204);
    });
  }
  