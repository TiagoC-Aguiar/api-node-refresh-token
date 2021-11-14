import { compare } from 'bcryptjs';
import { client } from '../../prisma/client';
import { generateTokenFactory, refreshTokenFactory } from '../../provider';
import { IRequest } from './';

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequest): Promise<object> {
    const userExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!userExists) {
      throw new Error('Username or password incorrect');
    }

    const passwordMatch = await compare(password, userExists.password);

    if (!passwordMatch) {
      throw new Error('Username of password incorect');
    }

    const generateToken = generateTokenFactory();
    const token = await generateToken.execute(userExists.id);

    await client.refreshToken.deleteMany({
      where: {
        userId: userExists.id,
      },
    });

    const generateRefreshToken = refreshTokenFactory();
    const refreshToken = await generateRefreshToken.execute(userExists.id);

    return { token, refreshToken };
  }
}

export default AuthenticateUserUseCase;
