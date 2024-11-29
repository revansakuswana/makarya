import { DataTypes } from "sequelize";
import db from "../config/database.js";

const UserSavedJobs = db.define(
  "usersavedjobs",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    jobsId: {
      type: DataTypes.INTEGER,
      references: {
        model: "jobs",
        key: "id",
      },
    },
  },
  { tableName: "usersavedjobs" }
);

export default UserSavedJobs;
