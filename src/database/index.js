const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Time = require("../models/Time");
const Jogador = require("../models/Jogador");
const Transferencia = require("../models/Transferencia");
const Torneio = require("../models/Torneio");
const Partida = require("../models/Partida");
const Evento = require("../models/Evento");
const TipoEvento = require("../models/TipoEvento");

const connection = new Sequelize(dbConfig);

Time.init(connection);
Jogador.init(connection);
Transferencia.init(connection);
Torneio.init(connection);
Partida.init(connection);
Evento.init(connection);
TipoEvento.init(connection);

module.exports = connection;
