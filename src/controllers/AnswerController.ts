import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import SurveysUsersRepository from '../repositories/SurveysUsersRepository';

class AnswerController {

  async execute(request: Request, response: Response) {

    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      return response.status(400).json({
        error: "Survey User does not exixts!",
      });
    }
    
    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }

}

export default AnswerController;


  // http://localhost:3003/answers/10?u=ff728088-1b9a-4211-a640-a91d978f3498
  /*
    Route Params -> Parâmetros que compõe a rota.
    routes.get("/answers/:value").

    Query Params -> Parâmetros de Busca ou Paginação mas não obrigatórios, 
    vem sempre depois do ponto de ? na url exemplo:
    ?chave=valor
    ?u=ff728088-1b9a-4211-a640-a91d978f3498
  */
