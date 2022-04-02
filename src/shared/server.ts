import './typeorm';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import AppError from '@errors/appError';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => console.log('rodando na porta 3333'));
