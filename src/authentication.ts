import express from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { IAuthentication } from './model/auth.model.ts';
import AuthorizationError from './errors/AuthorizationError.ts';
import connection from './config/db.config.ts';

dotenv.config();

const app = express();

// Middleware to Verify JWT
export const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
      (error: unknown, decoded: unknown) => {
        if (error) {
          throw new AuthorizationError(error as []);
        } else {
          res.locals.jwt = decoded;
          next();
        }
      }
    );
  } else {
    throw new AuthorizationError([
      {
        name: 'AuthorizationError',
        message: 'Authentication Error: Invalid Access Token',
      },
    ]);
  }
};

// Register user
export const registerAuth = app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO auth_acc (name, password) VALUES (?, ?)';
  const values = [username, hashedPassword];

  try {
    await connection.query(sql, values).then(() => {
      res.status(201).json({ message: 'User registered successfully!' });
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err;
    }
  }
});

// Login Route
export const loginAuth = app.get('/auth/login', async (req, res, next) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM auth_acc WHERE name = ?';
  const values = [username];

  try {
    const result = await connection.query<IAuthentication[]>(sql, values);
    const user = result[0][0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AuthorizationError([
        {
          name: 'AuthorizationError',
          message: 'Invalid credentials!',
        },
      ]);
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.name },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1h',
      }
    );

    res.json({ token, user: { id: user.id, name: user.name } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return next(
      new AuthorizationError([
        {
          name: 'AuthorizationError',
          message: err.message,
        },
      ])
    );
  }
});
