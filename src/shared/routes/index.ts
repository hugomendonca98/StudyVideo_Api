import { Router } from 'express';

import userController from '@modules/user/routes/user.routes';

const routes = Router();

routes.use('/user', userController.create);

export default routes;
