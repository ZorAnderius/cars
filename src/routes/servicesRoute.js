import express from 'express';
import isEmptyBody from '../middleware/isBody.js';
import validateBody from '../utils/validBody.js';
import { serviceCreateSchemas, serviceUpdateSchemas } from '../schemas/serviceSchemas.js';
import ctrlWrapper from '../utils/controllerWrapper.js';
import { authenticate } from '../middleware/auth.js';
import { 
  createServiceController, 
  getAllServicesController, 
  getServiceByIdController, 
  updateServiceController, 
  deleteServiceController 
} from '../controllers/servicesControllers.js';

const servicesRoute = express.Router();

servicesRoute.get('/', ctrlWrapper(getAllServicesController));
servicesRoute.get('/:id', ctrlWrapper(getServiceByIdController));

servicesRoute.post('/create', authenticate, isEmptyBody, validateBody(serviceCreateSchemas), ctrlWrapper(createServiceController));
servicesRoute.put('/:id/edit', authenticate, isEmptyBody, validateBody(serviceUpdateSchemas), ctrlWrapper(updateServiceController));
servicesRoute.delete('/:id/delete', authenticate, ctrlWrapper(deleteServiceController));

export default servicesRoute;