const ptBR = require("date-fns/locale/pt-BR");
const parse = require("date-fns/parse");
const Transferencia = require("../models/Transferencia");

module.exports = {
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

    return res.json(transferencia);
  },
};
