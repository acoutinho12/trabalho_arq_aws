"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("jogadores", {
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
      dt_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      pais: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timeId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'times',
          },
          key: 'id'
        },
        allowNull: false
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
    return queryInterface.dropTable("jogadores");
  },
};
