import ensureAuthenticate from '@modules/user/middlewares/ensureAuthenticate';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CourseController from '../controller/CourseController';

const courseRouter = Router();
const courseController = new CourseController();

courseRouter.post(
  '/',
  ensureAuthenticate,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      image_url: Joi.string().required(),
      category_id: Joi.string().required(),
      user_id: Joi.string().required(),
    },
  }),
  courseController.create,
);

courseRouter.get('/', courseController.index);

export default courseRouter;