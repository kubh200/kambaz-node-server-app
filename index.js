// import express from 'express';
// import Hello from "./Hello.js"
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import session from "express-session";
// const app = express()
// UserRoutes(app);
// app.use(cors({
//     credentials: true,
//     origin: process.env.NETLIFY_URL || "http://localhost:5173",
// }));
// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kambaz",
//     resave: false,
//     saveUninitialized: false,
// };
// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.NODE_SERVER_DOMAIN,
//     };
// }
// app.use(session(sessionOptions));
  
// app.use(express.json());
// Hello(app)
// Lab5(app);
// app.listen(process.env.PORT ||4000)
// import express from 'express';
// import Hello from "./Hello.js";
// import Lab5 from "./Lab5/index.js";
// import cors from "cors";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import session from "express-session";
// import CourseRoutes from "./Kambaz/Courses/routes.js";
// const app = express();

// const FRONTEND_ORIGIN = process.env.NETLIFY_URL || "http://localhost:5173";
// // Apply CORS middleware
// app.use(cors({
//     credentials: true,
//     origin: FRONTEND_ORIGIN,
// }));

// // Configure and apply session middleware before routes
// const sessionOptions = {
//     secret: process.env.SESSION_SECRET || "kambaz",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,              // Makes cookie only accessible to server
//         sameSite: "lax",             // ✅ Needed for cross-origin cookies on localhost
//         secure: false,               // ✅ Must be false for HTTP (localhost)
//         maxAge: 1000 * 60 * 60 * 24, // ✅ 1 day
//       }
// };
// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//         sameSite: "none",
//         secure: true,
//         domain: process.env.NODE_SERVER_DOMAIN,
//     };
// }
// app.use(session(sessionOptions));

// // Apply express.json middleware for parsing JSON bodies
// app.use(express.json());

// // Register routes after session middleware
// UserRoutes(app);
// Hello(app);
// CourseRoutes(app);
// Lab5(app);

// app.listen(process.env.PORT || 4000, () => console.log("Server running"));
// import express from 'express';
// import cors from 'cors';
// import session from 'express-session';

// import Hello from "./Hello.js";
// import Lab5 from "./Lab5/index.js";
// import UserRoutes from "./Kambaz/Users/routes.js";
// import CourseRoutes from "./Kambaz/Courses/routes.js";

// const app = express();

// const FRONTEND_ORIGIN = process.env.NETLIFY_URL || "http://localhost:5173";
// app.use(cors({
//   origin: FRONTEND_ORIGIN,
//   credentials: true
// }));

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "kambaz",
//   resave: false,
//   saveUninitialized: false,
// //   cookie: {
// //     httpOnly: true,
// //     sameSite: "lax",       // "lax" is ideal for localhost
// //     secure: false,         // false for local (true in prod over HTTPS)
// //     maxAge: 1000 * 60 * 60 * 24  // 1 day
// //   }
// };

// if (process.env.NODE_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//     domain: process.env.NODE_SERVER_DOMAIN
//   };
// }

// app.use(session(sessionOptions));
// app.use(express.json());

// UserRoutes(app);
// CourseRoutes(app);
// Hello(app);
// Lab5(app);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
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
    domain: process.env.NODE_SERVER_DOMAIN
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
