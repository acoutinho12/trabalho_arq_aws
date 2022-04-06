"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("eventos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipoEventoId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "tipo_eventos",
          },
          key: "id",
        },
        allowNull: false,
      },
      jogadorId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "jogadores",
          },
          key: "id",
        },
        allowNull: false,
      },
      timeId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "times",
          },
          key: "id",
        },
        allowNull: false,
      },
      partidaId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "partidas",
          },
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable("eventos");
  },
};
