const { Model, DataTypes } = require("sequelize");

class Evento extends Model {
  static init(sequelize) {
    super.init(
      {
        tipoEventoId: DataTypes.INTEGER,
        jogadorId: DataTypes.INTEGER,
        timeId: DataTypes.INTEGER,
        partidaId: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Evento;
