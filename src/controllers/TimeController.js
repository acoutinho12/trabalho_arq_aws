const Time = require("../models/Time");

module.exports = {
  async create(req, res) {    
    const { nome, localidade } = req.body;

    const time = await Time.create({ nome, localidade });

    return res.json(time);
  },
};
