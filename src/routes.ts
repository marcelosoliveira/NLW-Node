import { Router } from 'express';

import SurveyController from './controllers/SurveyController';
import SendMailController from './controllers/SendMailController';
import UserController from './controllers/UserController';

const router = Router();

const userController = new UserController();

const surveyController = new SurveyController();

const sendMailController = new SendMailController();

router.get("/users", userController.show);
router.post("/users", userController.create);

router.get("/surveys", surveyController.show);
router.post("/surveys", surveyController.create);

router.get("/sendMail", sendMailController.show);
router.post("/sendMail", sendMailController.execute);

export default router;

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
