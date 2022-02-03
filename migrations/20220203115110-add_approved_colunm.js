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
    return queryInterface.addColumn(
      "Community_joins",
      "approved",
      Sequelize.BOOLEAN
    );
  },

  async down({ context: queryInterface }) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn("Community_joins", "approved");
  },
};
