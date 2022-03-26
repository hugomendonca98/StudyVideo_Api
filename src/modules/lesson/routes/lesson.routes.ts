import ensureAuthenticate from '@modules/user/middlewares/ensureAuthenticate';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import LessonController from '../controllers/LessonController';

const lessonRouter = Router();
const lessonController = new LessonController();

lessonRouter.post(
  '/',
  ensureAuthenticate,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      video_url: Joi.string().required(),
      course_id: Joi.string().required(),
    },
  }),
  lessonController.create,
);

lessonRouter.get('/', lessonController.index);

lessonRouter.delete('/:id', ensureAuthenticate, lessonController.delete);

export default lessonRouter;
