const { Model, DataTypes } = require("sequelize");

class Transferencia extends Model {
  static init(sequelize) {
    super.init(
      {
        data: DataTypes.DATE,
        valor: DataTypes.DOUBLE,
        jogadorIdOrigem: DataTypes.INTEGER,
        timeIdOrigem: DataTypes.INTEGER,
        timeIdDestino: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "transferencias",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
  }
}

module.exports = Transferencia;
