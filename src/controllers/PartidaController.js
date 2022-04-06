const ptBR = require("date-fns/locale/pt-BR");
const parse = require("date-fns/parse");
const Partida = require("../models/Partida");
const Torneio = require("../models/Torneio");
const Time = require("../models/Time");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const partida = await Partida.destroy({
        where: {
          id: id,
        },
      });

      return res
        .status(partida > 0 ? 200 : 404)
        .json(
          partida > 0
            ? partida
            : { mensagem: "Nenhuma partida com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem:
          "Não foi possível apagar o partida, necessário apagar suas referencias em outras tabelas.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        dataHoraInicio,
        dataHoraFim,
        dataHoraIntervalo,
        estadio,
        timeCasaId,
        timeForaId,
        torneioId,
      } = req.body;
      var modelUpdated = {};

      if (dataHoraInicio)
        modelUpdated.dataHoraInicio = parse(
          dataHoraInicio,
          "dd/MM/yyyy HH:mm:ss",
          new Date(),
          {
            locale: ptBR,
          }
        );
      if (dataHoraFim)
        modelUpdated.dataHoraFim = parse(
          dataHoraFim,
          "dd/MM/yyyy HH:mm:ss",
          new Date(),
          {
            locale: ptBR,
          }
        );
      if (dataHoraIntervalo)
        modelUpdated.dataHoraIntervalo = parse(
          dataHoraIntervalo,
          "dd/MM/yyyy HH:mm:ss",
          new Date(),
          {
            locale: ptBR,
          }
        );
      if (estadio) modelUpdated.estadio = estadio;
      if (timeCasaId) modelUpdated.timeCasaId = timeCasaId;
      if (timeForaId) modelUpdated.timeForaId = timeForaId;
      if (torneioId) modelUpdated.torneioId = torneioId;

      await Partida.update(modelUpdated, {
        where: {
          id: id,
        },
      });

      const partida = await Partida.findOne({ where: { id: id } });

      return res
        .status(partida ? 200 : 404)
        .json(
          partida
            ? partida
            : { mensagem: "Nenhuma partida com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar a partida.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const partida = await Partida.findOne({ where: { id: id } });

      return res
        .status(partida ? 200 : 404)
        .json(
          partida
            ? partida
            : { mensagem: "Nenhum partida com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar a  partida.",
        error: e,
      });
    }
  },
  async create(req, res) {
    try {
      const {
        dataHoraInicio,
        dataHoraFim,
        dataHoraIntervalo,
        estadio,
        timeCasaId,
        timeForaId,
        torneioId,
      } = req.body;

      const data_hora_inicio = parse(dataHoraInicio, "dd/MM/yyyy HH:mm:ss", new Date(), {
        locale: ptBR,
      });
      const data_hora_fim = parse(dataHoraFim, "dd/MM/yyyy HH:mm:ss", new Date(), {
        locale: ptBR,
      });
      const data_hora_intervalo = parse(
        dataHoraIntervalo,
        "dd/MM/yyyy HH:mm:ss",
        new Date(),
        {
          locale: ptBR,
        }
      );

      const partida = await Partida.create({
        dataHoraInicio: data_hora_inicio,
        dataHoraFim: data_hora_fim,
        dataHoraIntervalo: data_hora_intervalo,
        estadio,
        timeCasaId,
        timeForaId,
        torneioId,
      });

      const torneio = await Torneio.findOne({ where: { id: torneioId } });
      const time1 = await Time.findOne({ where: { id: timeCasaId } });
      const time2 = await Time.findOne({ where: { id: timeForaId } });

      await req.producer.send({
        topic: "criar-partida",
        messages: [
          {
            value: `A partida do torneio ${torneio.nome} com início em ${dataHoraInicio} e término em ${dataHoraFim} entre os times ${time1.nome} e ${time2.nome} foi criado com sucesso`,
          },
        ],
      });

      return res.json(partida);
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar a  partida.",
        error: e,
      });
    }
  },
};
