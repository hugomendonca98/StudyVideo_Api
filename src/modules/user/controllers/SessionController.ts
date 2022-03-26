import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';

import BCryptHashProvider from '../providers/hashProvider/implementations/BCryptHashProvider';
import UserRepository from '../repositories/UserRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const hashProvider = new BCryptHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );

    const auth = await authenticateUserService.execute({ email, password });

    return response.json(instanceToInstance(auth));
  }
}
