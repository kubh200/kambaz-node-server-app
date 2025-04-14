import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import session from 'express-session';

import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
// import EnrollmentRoutes from './Kambaz/Enrollments/routes.js';

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);
// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
// mongoose.connect(CONNECTION_STRING, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("✅ Connected to MongoDB Atlas");
// })
// .catch((err) => {
//   console.error("❌ MongoDB connection error:", err);
//   process.exit(1);
// });
const app = express();

// const FRONTEND_ORIGIN = process.env.NETLIFY_URL || "http://localhost:5173";
const allowedOrigins = [
  "http://localhost:5173",
  "https://heroic-begonia-5522c8.netlify.app",
  "https://a6-kambaz-react-web-app-sp25.netlify.app"
];
// ✅ Enable CORS for frontend with credentials
// app.use(cors({
//   origin: FRONTEND_ORIGIN,
//   credentials: true
// }));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ CORS: Origin not allowed -> " + origin));
    }
  },
  credentials: true
}));

// ✅ Base session options
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",       // ✅ Send cookies for cross-origin GETs on localhost
    secure: false,         // ✅ Don't require HTTPS on localhost
    maxAge: 1000 * 60 * 60 * 24  // 1 day
  }
};

// ✅ Only override cookie settings in production
if (process.env.NODE_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    // domain: process.env.NODE_SERVER_DOMAIN
    maxAge: 1000 * 60 * 60 * 24
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// ✅ Routes
UserRoutes(app);
CourseRoutes(app);
Hello(app);
Lab5(app);
ModuleRoutes(app);
AssignmentRoutes(app);
// EnrollmentRoutes(app);
// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
