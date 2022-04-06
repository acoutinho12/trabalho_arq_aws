const { Model, DataTypes } = require("sequelize");

class Partida extends Model {
  static init(sequelize) {
    super.init(
      {
        dataHoraInicio: DataTypes.DATE,
        dataHoraFim: DataTypes.DATE,
        dataHoraIntervalo: DataTypes.DATE,
        estadio: DataTypes.STRING,
        timeCasaId: DataTypes.INTEGER,
        timeForaId: DataTypes.INTEGER,
        torneioId: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Partida;
