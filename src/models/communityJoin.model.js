const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const communityJoin = sequelize.define("Community_join", {
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    communityId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  });
  return communityJoin;
};
