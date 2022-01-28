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
  // dialectOptions: {
  //   ssl: {
  //     require: true, // This will help you. But you will see nwe error
  //     rejectUnauthorized: false, // This line will fix new error
  //   },
  // },
});

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/user.model")(sequelize, Sequelize);
db.Community = require("../models/community.model")(sequelize, Sequelize);
db.ApprovedUser = require("../models/approvedUser.model")(sequelize, Sequelize);

db.User.hasMany(db.Community, {
  foreignKey: "adminId",
  as: "admin",
});
db.Community.belongsTo(db.User, {
  foreignKey: "adminId",
  as: "admin",
});

db.User.hasMany(db.ApprovedUser, {
  foreignKey: "userId",
  as: "user",
});
db.ApprovedUser.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

db.Community.hasMany(db.ApprovedUser, {
  foreignKey: "communityId",
  as: "community",
});
db.ApprovedUser.belongsTo(db.Community, {
  foreignKey: "communityId",
  as: "community",
});

module.exports = db;
