const sq = require("sequelize");
const { Sequelize, DataTypes } = sq;
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_SCHEMA,
  port: process.env.DB_PORT,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.user, dbConfig.PASSWORD, {
  ...dbConfig,
  operatorsAliases: 0,
  define: {
    timestamps: true,
  },
  ssl: false,
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model")(sequelize, Sequelize);

module.exports = db;
