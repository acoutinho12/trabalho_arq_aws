const { Model, DataTypes } = require("sequelize");

class TipoEvento extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'tipo_eventos'
      }
    );
  }
}

module.exports = TipoEvento;
