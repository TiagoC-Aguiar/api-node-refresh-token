import { RefreshToken } from '.prisma/client';
import dayjs from 'dayjs';
import { client } from '../../prisma/client';
import { generateTokenFactory, refreshTokenFactory } from '../../provider';

type tokenType = {
  token: string;
  refreshToken?: RefreshToken;
};

export class RefreshTokenUserUseCase {
  async execute(currentRefreshToken: string): Promise<tokenType> {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: currentRefreshToken,
      },
    });

    if (!refreshToken) {
      throw new Error('Refresh token invalid');
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    const generateToken = generateTokenFactory();
    const token = await generateToken.execute(refreshToken.userId);

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });
      const generateRefreshTokenProvider = refreshTokenFactory();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refreshToken.userId
      );

      return { token, refreshToken: newRefreshToken };
    }

    return { token };
  }
}
