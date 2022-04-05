const ptBR = require("date-fns/locale/pt-BR");
const parse = require("date-fns/parse");

const Jogador = require("../models/Jogador");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const jogador = await Jogador.destroy({
        where: {
          id: id,
        },
      });

      return res
        .status(jogador > 0 ? 200 : 404)
        .json(
          jogador > 0
            ? jogador
            : { mensagem: "Nenhum jogador com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem:
          "Não foi possível apagar o jogador, necessário apagar suas referencias em outras tabelas.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, dt_nascimento, pais, timeId } = req.body;
      var modelUpdated = {};

      if (nome) modelUpdated.nome = nome;
      if (dt_nascimento) modelUpdated.dt_nascimento = dt_nascimento;
      if (pais) modelUpdated.pais = pais;
      if (timeId) modelUpdated.timeId = timeId;

      await Jogador.update(modelUpdated, {
        where: {
          id: id,
        },
      });

      const jogador = await Jogador.findOne({ where: { id: id } });

      return res
        .status(jogador ? 200 : 404)
        .json(
          jogador
            ? jogador
            : { mensagem: "Nenhum jogador com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar o jogador.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const jogador = await Jogador.findOne({ where: { id: id } });

      return res
        .status(jogador ? 200 : 404)
        .json(
          jogador
            ? jogador
            : { mensagem: "Nenhum jogador com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o jogador.",
        error: e,
      });
    }
  },

  async create(req, res) {
    const { nome, dt_nascimento, pais, timeId } = req.body;

    const dataNascimento = parse(dt_nascimento, "dd/MM/yyyy", new Date(), {
      locale: ptBR,
    });

    const jogador = await Jogador.create({
      nome,
      dt_nascimento: dataNascimento,
      pais,
      timeId,
    });

    return res.json(jogador);
  },
};
