import Despesa from '../models/Despesa';

class DespesaController {
  async index(req, res) {
    const despesas = await Despesa.listByCode(201);
    console.log(despesas);
    return res.json(despesas.result);
  }
}

export default new DespesaController();
