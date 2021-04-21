import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import { routes } from './routes';

import createConnection from './database';

createConnection();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(routes);

export { app };
