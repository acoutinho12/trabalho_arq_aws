const TipoEvento = require("../models/TipoEvento");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const tipoEvento = await TipoEvento.destroy({
        where: {
          id: id,
        },
      });

      return res
        .status(tipoEvento > 0 ? 200 : 404)
        .json(
          tipoEvento > 0
            ? { mensagem: "Tipo de Evento apagado com sucesso." }
            : { mensagem: "Nenhum tipo de evento com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem:
          "Não foi possível apagar o tipo de evento, necessário apagar suas referencias em outras tabelas.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      var modelUpdated = {};

      if (nome) modelUpdated.nome = nome;

      await TipoEvento.update(modelUpdated, {
        where: {
          id: id,
        },
      });

      const tipoEvento = await TipoEvento.findOne({ where: { id: id } });

      return res
        .status(tipoEvento ? 200 : 404)
        .json(
          tipoEvento
            ? tipoEvento
            : { mensagem: "Nenhum tipo de evento com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar o tipo de evento.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const tipoEvento = await TipoEvento.findOne({ where: { id: id } });

      return res
        .status(tipoEvento ? 200 : 404)
        .json(
          tipoEvento
            ? tipoEvento
            : { mensagem: "Nenhum tipo de evento com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o tipo de evento.",
        error: e,
      });
    }
  },

  async getTipoEventoByName(req, res) {
    try {
      const { nome } = req.params;

      const tipoEvento = await TipoEvento.findOne({ where: { nome: nome } });

      return tipoEvento;
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o tipo de evento.",
        error: e,
      });
    }
  },
  async create(req, res) {
    const { nome } = req.body;

    const tipoEvento = await TipoEvento.create({ nome });

    return res.json(tipoEvento);
  },
};
