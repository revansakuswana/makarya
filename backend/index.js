import express from "express";
import db from "../backend/config/database.js";
import router from "../backend/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import articleRoutes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";
// import { scheduleJobs } from "../backend/cron/jobs.js";
// import Users from "../backend/models/UserModel.js";
// import Jobs from "../backend/models/JobsModel.js";
// import UserSavedJobs from "../backend/models/UserSavedJobs.js";

dotenv.config();

const app = express();

// try {
//   await db.authenticate();
//   console.log("Database Connected...");

//   Users.belongsToMany(Jobs, { through: UserSavedJobs });
//   Jobs.belongsToMany(Users, { through: UserSavedJobs });

//   await db.sync();
//   console.log("Database & tables created!");
// } catch (error) {
//   console.error(error);
// }

app.use(
  cors({
    credentials: true,
    origin: process.env.APP_BASE_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use('/uploads', express.static('uploads'));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/articles", articleRoutes);
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", router);

app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Server running at port ${process.env.APP_PORT || 3000}`)
);