import AppError from '@errors/appError';
import IHashProvider from '../providers/hashProvider/interfaces/IHashProvider';
import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

interface IResponse {
  id: string;
  name: string;
  email: string;
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
  }: IRequest): Promise<IResponse> {
    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new AppError('There is already a user registered with this email.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return userWithoutPassword;
  }
}
