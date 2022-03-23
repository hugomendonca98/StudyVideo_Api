import { Router } from 'express';

import userRouter from '@modules/user/routes/user.routes';
import authRouter from '@modules/user/routes/auth.routes';

const routes = Router();

routes.use('/signup', userRouter);
routes.use('/login', authRouter);

export default routes;
