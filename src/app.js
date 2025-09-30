import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import env from './utils/env.js';
import errorHandler from './middleware/errorHandler.js';
import usersRoute from './routes/usersRoute.js';
import carsRoute from './routes/carsRoute.js';
import reviewsRoute from './routes/reviewsRoute.js';
import servicesRoute from './routes/servicesRoute.js';

const app = express();

app.use(morgan('tiny'));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: env("SESSION_SECRET", "your-secret-key"),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

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

// Error handler middleware (must be last)
app.use(errorHandler);

export default app;