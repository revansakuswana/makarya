import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Jobs = db.define(
  "jobs",
  {
    job_title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    work_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    working_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    link_img: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    study_requirement: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Menggunakan Sequelize timestamps untuk createdAt dan updateAt
    tableName: "jobs", // Nama tabel di database
  }
);

export default Jobs;
