const { Model, DataTypes } = require("sequelize");

class Torneio extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        dataInicio: DataTypes.DATEONLY,
        dataFim: DataTypes.DATEONLY
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Torneio;
