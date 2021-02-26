import { EntityRepository, Repository } from "typeorm";

import SurveyUser from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SuveysUsersRepository extends Repository<SurveyUser> {
  
}

export default SuveysUsersRepository;
