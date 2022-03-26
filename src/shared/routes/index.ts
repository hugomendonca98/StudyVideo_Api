import { Router } from 'express';

import userRouter from '@modules/user/routes/user.routes';
import authRouter from '@modules/user/routes/auth.routes';
import categoryRouter from '@modules/category/routes/category.routes';
import courseRouter from '@modules/course/routes/course.routes';

const routes = Router();

routes.use('/signup', userRouter);
routes.use('/login', authRouter);
routes.use('/category', categoryRouter);
routes.use('/course', courseRouter);

export default routes;
