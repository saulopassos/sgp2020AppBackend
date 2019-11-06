import Despesa from '../models/Despesa';

class DespesaController {
  async index(req, res) {
    const despesas = await Despesa.listByCode(5200);
    return res.json(despesas.result);
  }
}

export default new DespesaController();
