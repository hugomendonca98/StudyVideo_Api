import ensureAuthenticate from '@modules/user/middlewares/ensureAuthenticate';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post(
  '/',
  ensureAuthenticate,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
    },
  }),
  categoryController.create,
);

categoryRouter.get('/', categoryController.index);

export default categoryRouter;
