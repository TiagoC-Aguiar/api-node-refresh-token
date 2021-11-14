import { sign } from 'jsonwebtoken';

class GenerateTokenProvider {
  async execute(userId: string): Promise<string> {
    const token = sign({}, 'abcd@123', {
      subject: userId,
      expiresIn: '20s',
    });

    return token;
  }
}

export default GenerateTokenProvider;
