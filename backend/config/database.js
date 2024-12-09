import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_DATABASE || "makarya",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_CONNECTION || "mysql",
    port: process.env.DB_PORT || "3307",
    timezone: "+07:00",
  }
);

export default db;
