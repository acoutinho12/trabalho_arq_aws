const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Time = require("../models/Time");
const Jogador = require("../models/Jogador");
const Transferencia = require("../models/Transferencia");

const connection = new Sequelize(dbConfig);

Time.init(connection);
Jogador.init(connection);
Transferencia.init(connection);

module.exports = connection;
