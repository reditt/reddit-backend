const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const approvedUser = sequelize.define("ApprovedUser", {
    userId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    communityId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  });
  return approvedUser;
};
