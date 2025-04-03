import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function UserRoutes(app) {
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };
  const updateUser = (req, res) => { 
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signup = (req, res) => { 
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    const currentUser = dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = (req, res) => { 
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      console.log("✅ SESSION CREATED (signin):", req.session);
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
   };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    console.log("📡 Request headers:", req.headers);
    console.log("📥 Incoming session:", req.session);
    console.log("📥 SESSION RECEIVED (current/courses):", req.session);
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        console.log("❌ No currentUser in session");
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
  
    if (!currentUser) {
      console.log("❌ Cannot create course — no currentUser in session");
      return res.status(401).json({ message: "User not authenticated" });
    }
  
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  // const createCourse = (req, res) => {
  //   const currentUser = req.session["currentUser"];
  //   if (!currentUser) {
  //       res.status(401).json({ message: "User not authenticated" });
  //       return;
  //   }
  //   const newCourse = courseDao.createCourse(req.body);
  //   if (!newCourse) {
  //       res.status(500).json({ message: "Course creation failed" });
  //       return;
  //   }
  //   enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
  //   res.json(newCourse);
  // };
    // const createCourse = (req, res) => {
    //     const currentUser = req.session["currentUser"];
    //     if (!currentUser) {
    //     res.status(401).json({ message: "User not authenticated" });
    //     return;
    //     }
    //     const newCourse = courseDao.createCourse(req.body);
    //     if (!newCourse) {
    //     res.status(500).json({ message: "Course creation failed" });
    //     return;
    //     }
    //     enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    //     res.json(newCourse);
    // };

  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
}
