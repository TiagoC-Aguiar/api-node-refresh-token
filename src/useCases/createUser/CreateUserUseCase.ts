import { User } from '.prisma/client';
import { hash } from 'bcryptjs';
import { client } from '../../prisma/client';
import { IUserRequest } from '.';

class CreateUserUseCase {
  async execute({ username, password, name }: IUserRequest): Promise<User> {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error('Username alread exists');
    }

    const passHash = await hash(password, 8);
    const user = await client.user.create({
      data: {
        name,
        username,
        password: passHash,
      },
    });

    return user;
  }
}

export default CreateUserUseCase;
