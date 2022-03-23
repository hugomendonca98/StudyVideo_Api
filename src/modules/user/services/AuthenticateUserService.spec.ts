import AppError from '@errors/appError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate user.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Hugo Mendonça',
      email: 'hugomendonca9@gmail.com',
      password: '12345',
    });

    const response = await authenticateUserService.execute({
      email: user.email,
      password: '12345',
    });

    expect(response).toHaveProperty('token');
    expect(response.user.id).toEqual(user.id);
    expect(response.user.email).toEqual(user.email);
    expect(response.user.name).toEqual(user.name);
  });

  it('Should not be able to authenticate with an unregistered email.', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'hugomendonca9@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Hugo Mendonça',
      email: 'hugomendonca9@gmail.com',
      password: '12345',
    });

    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: 'incorrect password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to return user password.', async () => {
    const user = await fakeUserRepository.create({
      name: 'Hugo Mendonça',
      email: 'hugomendonca9@gmail.com',
      password: '12345',
    });

    const response = await authenticateUserService.execute({
      email: user.email,
      password: '12345',
    });

    expect(response.user).toHaveProperty('id');
    expect(response).toHaveProperty('token');
    expect(response.user).not.toHaveProperty('password');
  });
});
