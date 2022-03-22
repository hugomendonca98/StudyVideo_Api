import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '@modules/user/models/User';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
