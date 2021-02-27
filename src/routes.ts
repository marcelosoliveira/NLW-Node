import { Router } from 'express';

import SurveyController from './controllers/SurveyController';
import SendMailController from './controllers/SendMailController';
import UserController from './controllers/UserController';
import AnswerController from './controllers/AnswerController';
import NpsController from './controllers/NpsController';

const router = Router();

const userController = new UserController();

const surveyController = new SurveyController();

const sendMailController = new SendMailController();

const answerController = new AnswerController();

const npsController = new NpsController();

router.get("/users", userController.show);
router.post("/users", userController.create);

router.get("/surveys", surveyController.show);
router.post("/surveys", surveyController.create);

router.get("/sendMail", sendMailController.show);
router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", answerController.execute);

router.get("/nps/:survey_id", npsController.execute);

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
