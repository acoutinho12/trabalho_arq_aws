"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("transferencias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      jogadorIdOrigem: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'jogadores',
          },
          key: 'id'
        },
        allowNull: false
      },
      timeIdOrigem: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'times',
          },
          key: 'id'
        },
        allowNull: false
      },
      timeIdDestino: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'times',
          },
          key: 'id'
        },
        allowNull: false
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable("transferencias");
  },
};
