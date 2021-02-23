import express, { request } from 'express';

const app = express();

/* 
  METODOS DE REQUISIÇÃO
  GET > BUSCAR
  POST > SALVAR
  PUT > ALTERAR
  DELETE > DELETAR
  PATCH > ALTERAÇÃO ESPECÍFICA
*/

app.get("/", (request, response) => {
  return response.json({ message: "Hello World - NLW04" });
});

// 1° PARÂMETRO > ROTA(REACURSO DA API)
// 2° PARÂMETRO > CALLBACK(REQUEST, RESPONSE)

app.post("/", (request, response) => {
  //Dados para salvar
  return response.json({message: "Os dados foram salvos com sucesso!"});
});

app.listen(3003, () => console.log("Server is run"));