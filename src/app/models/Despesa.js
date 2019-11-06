import Sequelize, { Model } from 'sequelize';
import databaseConfig from '../../config/database';

class Despesa extends Model {
  static init(sequelize) {
    super.init({}, { sequelize });

    return this;
  }

  static listByCode(cddespesa) {
    const conn = new Sequelize(databaseConfig);

    const retorno = conn.query(' SELECT '
          + ' ISNULL(SUM(SALDODESPESA.vlOrcado + '
          + ' SALDODESPESA.vlSuplementado + '
          + ' SALDODESPESA.vlCreditoEspecial + '
          + ' SALDODESPESA.vlCreditoExtraord - '
          + ' SALDODESPESA.vlBloqueado - '
          + ' SALDODESPESA.vlReducao -'
          + ' SALDODESPESA.vlReserva -'
          + ' SALDODESPESA.vlEmpenhado +'
          + ' SALDODESPESA.vlAnulado), 0) AS sdAtual '
      + ' FROM'
          + ' DESPESA'
          + ' left JOIN SALDODESPESA'
          + ' ON DESPESA.cdUnidadeGestora = SALDODESPESA.cdUnidadeGestora'
          + ' AND DESPESA.cdDespesa = SALDODESPESA.cdDespesa'

          + ' INNER JOIN QueryFuncao'
          + ' ON DESPESA.cdFuncao = QueryFuncao.cdFuncao'

          + ' INNER JOIN QueryPrograma'
          + ' ON DESPESA.cdPrograma = QueryPrograma.cdPrograma'
      + ' WHERE'
          + ' (QueryFuncao.idPortaria42 = 2)'
          + ' AND (QueryPrograma.idPortaria42 = 2)'
          + ' AND DESPESA.cdDespesa = :despesa',
    { replacements: { despesa: cddespesa }, type: conn.QueryTypes.SELECT })
      .then((result) => ({ result }))
      .catch((err) => (('Unable to connect to the database:', err)));

    if (!retorno) {
      return { error: 'Rows not found' };
    }

    return retorno;
  }
}

export default Despesa;
