import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Articles = db.define(
  "articles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  }
);

Articles.associate = (models) => {
  Articles.belongsTo(models.Users, { foreignKey: "author_id", as: "author" });
};

export default Articles;
