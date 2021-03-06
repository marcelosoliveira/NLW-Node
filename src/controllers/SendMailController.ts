import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import SurveysRepository from '../repositories/SurveysRepository';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';
import UsersRepository from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';
import AppError from '../errors/AppError';

class SendMailController {

  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const userRepository = getCustomRepository(UsersRepository);
    const surveyRepository = getCustomRepository(SurveysRepository);
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (!userAlreadyExists) {
      throw new AppError("User does not exists!");
    }
    
    const surveyAlreadyExists = await surveyRepository.findOne({ id: survey_id });

    if (!surveyAlreadyExists) {
      throw new AppError("Survey does not exists!");
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserAlreadyExists = await surveyUserRepository.findOne({
      where: { user_id: userAlreadyExists.id, value: null },
      relations: ["user", "survey"],
    });


    const variables = {
      name: userAlreadyExists.name,
      title: surveyAlreadyExists.title,
      deacription: surveyAlreadyExists.description,
      id: "",
      link: process.env.URL_MAIL,
    }

    if(surveyUserAlreadyExists) {
      variables.id = surveyUserAlreadyExists.id;
      await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);
      return response.json(surveyUserAlreadyExists);
    }

    // Salvar as informações na tabela surveyUser.
    const surveyUser = surveyUserRepository.create({
      user_id: userAlreadyExists.id,
      survey_id,
    });

    await surveyUserRepository.save(surveyUser);

    variables.id = surveyUser.id;

    // Enviar email para o usuário.

    await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);

    return response.json(surveyUser);

  }

  async show(request: Request, response: Response) {
    const surveyUserRepository = getCustomRepository(SurveysUsersRepository)
    const all = await surveyUserRepository.find();

    return response.json(all);
  }

}

export default SendMailController;
