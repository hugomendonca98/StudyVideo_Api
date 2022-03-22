import User from '../models/User';
import IHashProvider from '../providers/hashProvider/interfaces/IHashProvider';
import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // Implementar as regras de negocio.
  }
}
