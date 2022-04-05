const { Model, DataTypes } = require("sequelize");

class Time extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        localidade: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = Time;
