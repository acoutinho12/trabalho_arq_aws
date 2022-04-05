const { Model, DataTypes } = require("sequelize");

class Jogador extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        dt_nascimento: DataTypes.DATEONLY,
        pais: DataTypes.STRING,
        timeId: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'jogadores'
      }
    );
  }
}

module.exports = Jogador;
