import { Router } from 'express';
import Despesa from './app/controllers/DespesaController';

const routes = new Router();

routes.get('/', Despesa.index);

export default routes;
