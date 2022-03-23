import AppError from '@errors/appError';
import authConfig from '@config/auth';
import { sign } from 'jsonwebtoken';
import IHashProvider from '../providers/hashProvider/interfaces/IHashProvider';
import IUserRepository from '../repositories/interfaces/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IUserWithourPassoword {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface IResponse {
  user: IUserWithourPassoword;
  token: string;
}

export default class AuthenticateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExist = await this.userRepository.findByEmail(email);

    if (!userExist) {
      throw new AppError('Incorrect email / password combination.', 401);
    }

    const passwordHashed = await this.hashProvider.compareHash(
      password,
      userExist.password,
    );

    if (!passwordHashed) {
      throw new AppError('Incorrect email / password combination.', 401);
    }

    const { secret, expireIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userExist.id,
      expiresIn: expireIn,
    });

    const userWithoutPassword = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      created_at: userExist.created_at,
      updated_at: userExist.updated_at,
    };

    return { user: userWithoutPassword, token };
  }
}
