import express from "express";
import router from "../backend/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.APP_BASE_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public/images/', express.static(path.join(__dirname, 'public/images/')));
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", router);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server running at port ${process.env.APP_PORT}`)
);