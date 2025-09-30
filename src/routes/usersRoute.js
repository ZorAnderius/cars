import express from 'express';
import isEmptyBody from '../middleware/isBody.js';
import validateBody from '../utils/validBody.js';
import { registerSchemas, loginSchemas } from '../schemas/registerSchemas.js';
import ctrlWrapper from '../utils/controllerWrapper.js';
import { registeController, loginController, logoutController, getCurrentUserController } from '../controllers/usersControllers.js';

const usersRoute = express.Router();

usersRoute.post('/register', isEmptyBody, validateBody(registerSchemas), ctrlWrapper(registeController));
usersRoute.post('/login', isEmptyBody, validateBody(loginSchemas), ctrlWrapper(loginController));
usersRoute.post('/logout', ctrlWrapper(logoutController));
usersRoute.get('/me', ctrlWrapper(getCurrentUserController));

export default usersRoute;