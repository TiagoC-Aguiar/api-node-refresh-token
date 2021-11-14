import dayjs from 'dayjs';
import { RefreshToken } from '.prisma/client';
import { client } from '../prisma/client';

class GenerateRefreshToken {
  async execute(userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'second').unix();
    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken;
  }
}

export default GenerateRefreshToken;
