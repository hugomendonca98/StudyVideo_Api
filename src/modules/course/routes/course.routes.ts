import ensureAuthenticate from '@modules/user/middlewares/ensureAuthenticate';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CourseController from '../controllers/CourseController';
import SingleCourseController from '../controllers/SingleCourseController';

const courseRouter = Router();
const courseController = new CourseController();
const singleCourseController = new SingleCourseController();

courseRouter.post(
  '/',
  ensureAuthenticate,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      image_url: Joi.string().required(),
      category_title: Joi.string().required(),
    },
  }),
  courseController.create,
);

courseRouter.get('/', courseController.index);
courseRouter.get('/:id', singleCourseController.index);

courseRouter.delete('/:id', ensureAuthenticate, courseController.delete);

courseRouter.put(
  '/:id',
  ensureAuthenticate,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      image_url: Joi.string().required(),
      category_id: Joi.string().required(),
      user_id: Joi.string().required(),
    },
  }),
  courseController.update,
);

export default courseRouter;
