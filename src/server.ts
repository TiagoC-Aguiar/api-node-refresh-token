import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(400).json({
    error: err.message,
  });
});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
