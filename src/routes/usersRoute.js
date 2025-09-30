import express from 'express';
import isEmptyBody from '../middleware/isBody.js';
import validateBody from '../utils/validBody.js';
import registerSchemas from '../schemas/registerSchemas.js';
import ctrlWrapper from '../utils/controllerWrapper.js';
import { registeController } from '../controllers/usersControllers.js';

const usersRoute = express.Router();

usersRoute.post('/register', isEmptyBody, validateBody(registerSchemas), ctrlWrapper(registeController))

export default usersRoute;