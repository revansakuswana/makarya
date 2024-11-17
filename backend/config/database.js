import { Sequelize } from "sequelize";

const db = new Sequelize("makarya", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: "3307",
  timezone: "+07:00",
});

export default db;
