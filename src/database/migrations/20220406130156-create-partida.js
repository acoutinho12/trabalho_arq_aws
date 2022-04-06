"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("partidas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dataHoraInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataHoraFim: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataHoraIntervalo: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tempoAcrescimoMinutos: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      },
      estadio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      timeCasaId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'times',
          },
          key: 'id'
        },
        allowNull: false
      },
      timeForaId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'times',
          },
          key: 'id'
        },
        allowNull: false
      },
      torneioId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'torneios',
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
    return queryInterface.dropTable("partidas");
  },
};
