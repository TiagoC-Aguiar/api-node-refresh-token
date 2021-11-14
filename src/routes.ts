import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { AuthenticateUserController } from './useCases/authenticateUser';
import { CreateUserController } from './useCases/createUser';
import { RefreshTokenUserController } from './useCases/refreshToken/RefreshTokenUserController';

const router = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenUserController();

router.post('/api/v1/users', createUserController.handle);
router.post('/api/v1/login', authenticateController.handle);
router.post('/api/v1/refresh-token', refreshTokenController.handle);

router.get(
  '/api/v1/courses',
  ensureAuthenticated,
  (req: Request, res: Response) => {
    return res.json([
      { id: 1, name: 'NodeJS' },
      { id: 2, name: 'ReactJS' },
      { id: 3, name: 'React Native' },
      { id: 4, name: 'Java' },
    ]);
  }
);

export { router };
