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
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "",
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verification_token: {
      type: DataTypes.STRING,
    },
    verification_expires: {
      type: DataTypes.STRING,
    },
    reset_password_token: {
      type: DataTypes.STRING,
    },
    reset_password_expires: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

Users.associate = (models) => {
  Users.hasMany(models.Articles, { foreignKey: "author_id", as: "articles" });
};

export default Users;
