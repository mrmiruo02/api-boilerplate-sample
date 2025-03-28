import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import { routes } from './routes.ts';
import {
  authenticateToken,
  loginAuth,
  registerAuth,
} from './authentication.ts';
import path from 'path';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middleware/globalErrorHandler.ts';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', registerAuth);
app.use('/api', loginAuth);

// Serve files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

routes.forEach(({ path, route }) => {
  app.use(path, authenticateToken, route);
});

app.use(globalErrorHandler as ErrorRequestHandler);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${process.env.PORT}`);
});
