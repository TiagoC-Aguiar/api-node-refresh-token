import { Request, Response } from 'express';
import { CreateUserUseCase } from '.';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, password } = req.body;
    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.execute({
      username,
      name,
      password,
    });

    return res.json(user);
  }
}

export default CreateUserController;
