import { hash } from "bcryptjs";
import { User } from "../../entities/User";

import { ICreateUserDTO } from "../../useCases/createUser/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === user_id);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const {name, email, password} = data
    const passwordHash = await hash(password, 8)

    const user = new User();
    Object.assign(user, {
      name,
      email,
      password: passwordHash  
    });

    this.users.push(user);
    return user;
  }
}
