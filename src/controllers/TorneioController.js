const ptBR = require("date-fns/locale/pt-BR");
const parse = require("date-fns/parse");
const Torneio = require("../models/Torneio");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const torneio = await Torneio.destroy({
        where: {
          id: id,
        },
      });

      return res
        .status(torneio > 0 ? 200 : 404)
        .json(
          torneio > 0
            ? { mensagem: "Torneio apagado com sucesso." }
            : { mensagem: "Nenhum torneio com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem:
          "Não foi possível apagar o torneio, necessário apagar suas referencias em outras tabelas.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, dataInicio, dataFim } = req.body;
      var modelUpdated = {};

      if (nome) modelUpdated.nome = nome;
      if (dataInicio)
        modelUpdated.dataInicio = parse(dataInicio, "dd/MM/yyyy", new Date(), {
          locale: ptBR,
        });
      if (dataFim)
        modelUpdated.dataFim = parse(dataFim, "dd/MM/yyyy", new Date(), {
          locale: ptBR,
        });

      await Torneio.update(modelUpdated, {
        where: {
          id: id,
        },
      });

      const torneio = await Torneio.findOne({ where: { id: id } });

      return res
        .status(torneio ? 200 : 404)
        .json(
          torneio
            ? torneio
            : { mensagem: "Nenhum torneio com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar o torneio.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const torneio = await Torneio.findOne({ where: { id: id } });

      return res
        .status(torneio ? 200 : 404)
        .json(
          torneio
            ? torneio
            : { mensagem: "Nenhum torneio com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o torneio.",
        error: e,
      });
    }
  },
  async create(req, res) {
    try {
      const { nome, dataInicio, dataFim } = req.body;

      const data_inicio = parse(dataInicio, "dd/MM/yyyy", new Date(), {
        locale: ptBR,
      });
      const data_fim = parse(dataFim, "dd/MM/yyyy", new Date(), {
        locale: ptBR,
      });

      const torneio = await Torneio.create({
        nome,
        dataInicio: data_inicio,
        dataFim: data_fim,
      });

      await req.producer.send({
        topic: "criar-torneio",
        messages: [{ value: `O Torneio ${torneio.nome} foi criado com sucesso` }],
      });

      return res.json(torneio);
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível criar o torneio.",
        error: e,
      });
    }
  },
};
