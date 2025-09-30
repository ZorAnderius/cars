import express from 'express';
import isEmptyBody from '../middleware/isBody.js';
import validateBody from '../utils/validBody.js';
import { reviewCreateSchemas, reviewUpdateSchemas } from '../schemas/reviewSchemas.js';
import ctrlWrapper from '../utils/controllerWrapper.js';
import { authenticate } from '../middleware/auth.js';
import { 
  createReviewController, 
  getAllReviewsController, 
  getReviewByIdController, 
  updateReviewController, 
  deleteReviewController 
} from '../controllers/reviewsControllers.js';

const reviewsRoute = express.Router();

reviewsRoute.get('/', ctrlWrapper(getAllReviewsController));
reviewsRoute.post('/create', isEmptyBody, validateBody(reviewCreateSchemas), ctrlWrapper(createReviewController));
reviewsRoute.get('/:id', ctrlWrapper(getReviewByIdController));

reviewsRoute.put('/:id/edit', authenticate, isEmptyBody, validateBody(reviewUpdateSchemas), ctrlWrapper(updateReviewController));
reviewsRoute.delete('/:id/delete', authenticate, ctrlWrapper(deleteReviewController));

export default reviewsRoute;