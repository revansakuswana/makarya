import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    isVerified: {
      type: DataTypes.STRING,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
    verificationExpires: {
      type: DataTypes.STRING,
    },
    reset_password_token: {
      type: DataTypes.STRING,
    },
    reset_password_expires: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
    education: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
    skills: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
