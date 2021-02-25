import { Router } from 'express';

import SurveyController from './controllers/SurveyController';
import UserController from './controllers/UserController';

const router = Router();

const userController = new UserController();

const surveyController = new SurveyController();

router.get("/users", userController.show);
router.post("/users", userController.create);

router.get("/surveys", surveyController.show);
router.post("/surveys", surveyController.create);

export default router;
