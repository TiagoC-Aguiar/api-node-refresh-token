import { GenerateRefreshToken, GenerateTokenProvider } from '.';

export const refreshTokenFactory = (): GenerateRefreshToken => {
  return new GenerateRefreshToken();
};

export const generateTokenFactory = (): GenerateTokenProvider => {
  return new GenerateTokenProvider();
};
