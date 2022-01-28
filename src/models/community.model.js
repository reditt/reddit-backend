const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define("Community", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    access: {
      type: DataTypes.ENUM("PUBLIC", "PROTECTED", "PRIVATE"),
      defaultValue: "PUBLIC",
    },
    logo: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    adult: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    adminId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  });
  return Community;
};
