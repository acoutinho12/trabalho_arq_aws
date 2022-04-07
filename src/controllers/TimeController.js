const Time = require("../models/Time");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const time = await Time.destroy({
        where: {
          id: id,
        },
      });

      return res
        .status(time > 0 ? 200 : 404)
        .json(
          time > 0
            ? { mensagem: "Time apagado com sucesso." }
            : { mensagem: "Nenhum time com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem:
          "Não foi possível apagar o time, necessário apagar suas referencias em outras tabelas.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, localidade } = req.body;
      var modelUpdated = {};

      if (nome) modelUpdated.nome = nome;
      if (localidade) modelUpdated.localidade = localidade;

      await Time.update(modelUpdated, {
        where: {
          id: id,
        },
      });

      const time = await Time.findOne({ where: { id: id } });

      return res
        .status(time ? 200 : 404)
        .json(
          time
            ? time
            : { mensagem: "Nenhum time com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar o time.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const time = await Time.findOne({ where: { id: id } });

      return res
        .status(time ? 200 : 404)
        .json(
          time
            ? time
            : { mensagem: "Nenhum time com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o time.",
        error: e,
      });
    }
  },
  async create(req, res) {    
    const { nome, localidade } = req.body;

    const time = await Time.create({ nome, localidade });

    await req.producer.send({
      topic: "criar-time",
      messages: [
        {
          value: `Time ${nome} criado com sucesso`,
        },
      ],
    });

    return res.json(time);
  },
};
