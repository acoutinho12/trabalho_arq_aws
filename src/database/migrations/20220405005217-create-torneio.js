"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("torneios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable("torneios");
  },
};
