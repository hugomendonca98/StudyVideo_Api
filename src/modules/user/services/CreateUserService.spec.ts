import AppError from '@errors/appError';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/hashProvider/interfaces/IHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import IUserRepository from '../repositories/interfaces/IUserRepository';
import CreateUserService from './CreateUserService';

let fakeUserRepository: IUserRepository;
let fakeHashProvider: IHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new user.', async () => {
    const user = await createUserService.execute({
      name: 'Hugo Mendonça',
      email: 'hugomendonca9@gmail.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toEqual('Hugo Mendonça');
    expect(user.email).toEqual('hugomendonca9@gmail.com');
    expect(user).toEqual(user);
  });

  it('Should not be able to create a new user with same exist email.', async () => {
    await fakeUserRepository.create({
      name: 'Hugo Mendonça',
      email: 'hugomendonca9@gmail.com',
      password: '12345',
    });

    await expect(
      createUserService.execute({
        name: 'Hugo Mendonça',
        email: 'hugomendonca9@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to return the created user password.', async () => {
    const user = await createUserService.execute({
      name: 'Hugo Mendonça',
      email: 'hugomendonca9@gmail.com',
      password: '12345',
    });

    expect(user).not.toHaveProperty('password');
    expect(user).toHaveProperty('id');
    expect(user.name).toEqual('Hugo Mendonça');
    expect(user.email).toEqual('hugomendonca9@gmail.com');
  });
});
