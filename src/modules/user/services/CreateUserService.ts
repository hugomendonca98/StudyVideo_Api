import AppError from '@errors/appError';

import IHashProvider from '../providers/hashProvider/interfaces/IHashProvider';
import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IUserWithourPassoword {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export default class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<IUserWithourPassoword> {
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new AppError('Já existe um usuário cadastrado com este email.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user: IUserWithourPassoword = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}
