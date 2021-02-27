import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";

import SurveysUsersRepository from '../repositories/SurveysUsersRepository';

class NpsController {

  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    
    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveysUsers.filter
    (({ value }) => value >= 0 && value <= 6).length;

    const promoters = surveysUsers.filter(({ value }) => value > 8 && value <= 10).length;

    const passives = surveysUsers.filter(({ value }) => value > 6 && value <= 8).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
        (((promoters - detractors) / totalAnswers) * 100).toFixed(2));

    return response.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps: calculate,
    });

  }

}

export default NpsController;

/**
 * Calculo de notas
 * 1 2 3 4 5 6 7 8 9 10
 * Detratores -> 0 - 6
 * Passivos -> 7 - 8
 * Promotores -> 9 - 10
 * 
 * expressão -> ((numero_promotores - numero_detratores) / numero_respondentes) * 100.
 */