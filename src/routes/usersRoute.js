import express from 'express';
import isEmptyBody from '../middleware/isBody.js';
import validateBody from '../utils/validBody.js';
import { registerSchemas, loginSchemas } from '../schemas/authSchemas.js';
import ctrlWrapper from '../utils/controllerWrapper.js';
import { registeController, loginController, logoutController, getCurrentUserController, refreshController } from '../controllers/usersControllers.js';

const usersRoute = express.Router();

usersRoute.post('/register', isEmptyBody, validateBody(registerSchemas), ctrlWrapper(registeController));
usersRoute.post('/login', isEmptyBody, validateBody(loginSchemas), ctrlWrapper(loginController));
usersRoute.post('/logout', ctrlWrapper(logoutController));
usersRoute.get('/me', ctrlWrapper(getCurrentUserController));
usersRoute.post('/refresh', ctrlWrapper(refreshController));

export default usersRoute;