import AppError from '@errors/appError';
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
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new AppError('Já existe um usuário cadastrado com este email.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
