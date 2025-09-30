import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import usersRoute from './routes/usersRoute.js';
import carsRoute from './routes/carsRoute.js';
import reviewsRoute from './routes/reviewsRoute.js';
import servicesRoute from './routes/servicesRoute.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser());
app.use(
  express.json({
    type: ['application/json'],
  })
);

app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static('public'));

app.use('/admin', usersRoute);
app.use('/cars', carsRoute);
app.use('/reviews', reviewsRoute);
app.use('/services', servicesRoute);

export default app;