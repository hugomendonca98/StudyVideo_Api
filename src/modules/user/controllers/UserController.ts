import { Request, Response } from 'express';
import BCryptHashProvider from '../providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();

    const createUserService = new CreateUserService(
      userRepository,
      hashProvider,
    );

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
