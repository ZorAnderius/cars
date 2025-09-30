import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import cookieParser from 'cookie-parser';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(cookieParser());
app.use(
  express.json({
    type: ['application/json'],
  })
)

app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static('public'));

export default app;