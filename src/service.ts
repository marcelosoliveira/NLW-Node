import 'reflect-metadata';
import express from 'express';

import './database';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.listen(3003, () => console.log("Server is run"));

/* 
  METODOS DE REQUISIÇÃO
  GET > BUSCAR
  POST > SALVAR
  PUT > ALTERAR
  DELETE > DELETAR
  PATCH > ALTERAÇÃO ESPECÍFICA
*/

// 1° PARÂMETRO > ROTA(RECURSO DA API)
// 2° PARÂMETRO > CALLBACK(REQUEST, RESPONSE)
