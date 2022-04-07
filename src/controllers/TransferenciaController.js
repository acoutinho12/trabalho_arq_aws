const ptBR = require("date-fns/locale/pt-BR");
const parse = require("date-fns/parse");
const Transferencia = require("../models/Transferencia");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.params;
      const transferencia = await Transferencia.destroy({
        where: {
          id: id,
        },
      });

      return res
        .status(transferencia > 0 ? 200 : 404)
        .json(
          transferencia > 0
            ? { mensagem: "Transferencia apagada com sucesso." }
            : { mensagem: "Nenhum transferencia com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem:
          "Não foi possível apagar o transferencia, necessário apagar suas referencias em outras tabelas.",
        error: e,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { data, valor, jogadorIdOrigem, timeIdOrigem, timeIdDestino } = req.body;
      var modelUpdated = {};

      if (data) modelUpdated.data = parse(data, "dd/MM/yyyy", new Date(), {
        locale: ptBR,
      });
      if (valor) modelUpdated.valor = valor;
      if (jogadorIdOrigem) modelUpdated.jogadorIdOrigem = jogadorIdOrigem;
      if (timeIdOrigem) modelUpdated.timeIdOrigem = timeIdOrigem;
      if (timeIdDestino) modelUpdated.timeIdDestino = timeIdDestino;

      await Transferencia.update(modelUpdated, {
        where: {
          id: id,
        },
      });

      const transferencia = await Transferencia.findOne({ where: { id: id } });

      return res
        .status(transferencia ? 200 : 404)
        .json(
          transferencia
            ? transferencia
            : { mensagem: "Nenhum transferencia com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível atualizar o transferencia.",
        error: e,
      });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;

      const transferencia = await Transferencia.findOne({ where: { id: id } });

      return res
        .status(transferencia ? 200 : 404)
        .json(
          transferencia
            ? transferencia
            : { mensagem: "Nenhum transferencia com o id encontrado." }
        );
    } catch (e) {
      return res.status(500).json({
        mensagem: "Não foi possível encontrar o transferencia.",
        error: e,
      });
    }
  },
  async create(req, res) {
    const { data, valor, jogadorIdOrigem, timeIdOrigem, timeIdDestino } =
      req.body;

    const dataTransferencia = data
      ? parse(data, "dd/MM/yyyy", new Date(), {
          locale: ptBR,
        })
      : new Date();

    const transferencia = await Transferencia.create({
      data: dataTransferencia,
      valor,
      jogadorIdOrigem,
      timeIdOrigem,
      timeIdDestino,
    });

    await req.producer.send({
      topic: "realizar-transferencia",
      messages: [
        {
          value: `Transferencia realizada com sucesso`,
        },
      ],
    });

    return res.json(transferencia);
  },
};
