import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';

import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required("Nome obrigatório"),
      email: yup.string().email().required("Email inválido"),
    });

  /* 1° Forma de validar erros
  if (!(await schema.isValid(request.body))) {
      return response.status(400).json({
        error: "Validation Failed",
      });
    }
 */
    // 2° Forma de validar erros
    try {
      await schema.validate(request.body, { abortEarly: false });
    }catch(err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usersAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (usersAlreadyExists) {
      throw new AppError("Users already exists!");
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    response.status(201).json(user);    
  }

  async show(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const all = await usersRepository.find();
    
    return response.json(all);
  }
}

export default UserController;
