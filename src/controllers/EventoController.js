const Evento = require("../models/Evento");
const Jogador = require("../models/Jogador");
const Time = require("../models/Time");
const TipoEventoController = require("./TipoEventoController");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const evento = await Evento.destroy({
        where: {
          id: id,
        },
      });

      return res
        .status(evento > 0 ? 200 : 404)
        .json(
          evento > 0
            ? evento
            : { mensagem: "Nenhum evento com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem:
          "Não foi possível apagar o evento, necessário apagar suas referencias em outras tabelas.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { tipoEventoId, jogadorId, timeId, partidaId } = req.body;
      var modelUpdated = {};

      if (tipoEventoId) modelUpdated.tipoEventoId = tipoEventoId;
      if (jogadorId) modelUpdated.jogadorId = jogadorId;
      if (timeId) modelUpdated.timeId = timeId;
      if (partidaId) modelUpdated.partidaId = partidaId;

      await Evento.update(modelUpdated, {
        where: {
          id: id,
        },
      });

      const evento = await Evento.findOne({ where: { id: id } });

      return res
        .status(evento ? 200 : 404)
        .json(
          evento ? evento : { mensagem: "Nenhum evento com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar o evento.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findOne({ where: { id: id } });

      return res
        .status(evento ? 200 : 404)
        .json(
          evento ? evento : { mensagem: "Nenhum evento com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o  evento.",
        error: e,
      });
    }
  },
  async create(req, res) {
    const { tipoEventoId, jogadorId, timeId, partidaId } = req.body;

    const evento = await Evento.create({
      tipoEventoId,
      jogadorId,
      timeId,
      partidaId,
    });

    return res.json(evento);
  },
  async createGol(req, res) {
    try {
      const { jogadorId } = req.body;
      const { idTorneio, idPartida } = req.params;

      const reqTipoEvento = { params: { nome: "Gol" } };

      const tipoEvento = await TipoEventoController.getTipoEventoByName(
        reqTipoEvento,
        res
      );

      const jogador = await Jogador.findOne({ where: { id: jogadorId } });

      const evento = await Evento.create({
        tipoEventoId: tipoEvento.id,
        jogadorId,
        timeId: jogador.timeId,
        partidaId: idPartida,
      });

      const time = await Time.findOne({ where: { id: jogador.timeId } });

      await req.producer.send({
        topic: "criar-evento",
        messages: [
          {
            value: `Gol de ${jogador.nome} do time ${time.nome}`,
          },
        ],
      });

      return res.json(evento);
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o  evento.",
        error: e,
      });
    }
  },
  async createCartaoAmarelo(req, res) {
    try {
      const { jogadorId } = req.body;
      const { idTorneio, idPartida } = req.params;

      const reqTipoEvento = { params: { nome: "Cartão Amarelo" } };

      const tipoEvento = await TipoEventoController.getTipoEventoByName(
        reqTipoEvento,
        res
      );

      const jogador = await Jogador.findOne({ where: { id: jogadorId } });

      const evento = await Evento.create({
        tipoEventoId: tipoEvento.id,
        jogadorId,
        timeId: jogador.timeId,
        partidaId: idPartida,
      });

      const time = await Time.findOne({ where: { id: jogador.timeId } });

      await req.producer.send({
        topic: "criar-evento",
        messages: [
          {
            value: `Cartão amarelo para ${jogador.nome} do time ${time.nome}`,
          },
        ],
      });

      return res.json(evento);
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o  evento.",
        error: e,
      });
    }
  },
  async createCartaoVermelho(req, res) {
    try {
      const { jogadorId } = req.body;
      const { idTorneio, idPartida } = req.params;

      const reqTipoEvento = { params: { nome: "Cartão Vermelho" } };

      const tipoEvento = await TipoEventoController.getTipoEventoByName(
        reqTipoEvento,
        res
      );

      const jogador = await Jogador.findOne({ where: { id: jogadorId } });

      const evento = await Evento.create({
        tipoEventoId: tipoEvento.id,
        jogadorId,
        timeId: jogador.timeId,
        partidaId: idPartida,
      });

      const time = await Time.findOne({ where: { id: jogador.timeId } });

      await req.producer.send({
        topic: "criar-evento",
        messages: [
          {
            value: `Cartão vermelho para ${jogador.nome} do time ${time.nome}`,
          },
        ],
      });

      return res.json(evento);
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o  evento.",
        error: e,
      });
    }
  },
};
