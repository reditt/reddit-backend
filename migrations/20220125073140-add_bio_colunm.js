"use strict";

const { Sequelize } = require("sequelize");

module.exports = {
  async up({ context: queryInterface }) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("Users", "bio", Sequelize.STRING);
  },

  async down({ context: queryInterface }) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn("Users", "bio");
  },
};
