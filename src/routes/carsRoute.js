import express from 'express';
import isEmptyBody from '../middleware/isBody.js';
import validateBody from '../utils/validBody.js';
import { carCreateSchemas, carUpdateSchemas } from '../schemas/carSchemas.js';
import ctrlWrapper from '../utils/controllerWrapper.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../utils/multer.js';
import { 
  createCarController, 
  getAllCarsController, 
  getCarByIdController, 
  updateCarController, 
  deleteCarController 
} from '../controllers/carsControllers.js';

const carsRoute = express.Router();

carsRoute.get('/', ctrlWrapper(getAllCarsController));
carsRoute.get('/:id', ctrlWrapper(getCarByIdController));


carsRoute.post('/create', authenticate, upload.single('photo'), isEmptyBody, validateBody(carCreateSchemas), ctrlWrapper(createCarController));
carsRoute.put('/:id/edit', authenticate, upload.single('photo'), isEmptyBody, validateBody(carUpdateSchemas), ctrlWrapper(updateCarController));
carsRoute.delete('/:id/delete', authenticate, ctrlWrapper(deleteCarController));

export default carsRoute;