const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: true,
        allowNull: false,
      },
      encryptedPassword: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: false,
      },
      profilePhoto: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      userName: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: true,
      },
      bio: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.encryptedPassword) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.encryptedPassword = bcrypt.hashSync(
              user.encryptedPassword,
              salt
            );
          }
        },
        beforeUpdate: async (user) => {
          if (user.encryptedPassword) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.encryptedPassword = bcrypt.hashSync(
              user.encryptedPassword,
              salt
            );
          }
        },
      },
      instanceMethods: {
        validPassword: (password) => {
          return bcrypt.compareSync(password, this.encryptedPassword);
        },
      },
    }
  );

  User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  return User;
};
