import express from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { IAuthentication } from './model/auth.model.ts';
import AuthorizationError from './errors/AuthorizationError.ts';
import connection from './config/db.config.ts';

dotenv.config();

const app = express();

/**
 * Middleware to Verify JWT
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {void}
 */
export const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (error: unknown, decoded: unknown) => {
      if (error) {
        throw new AuthorizationError(error as []);
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
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
  const { username, password, roles } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO user_acc (user_name, password, roles) VALUES (?, ?, ?)';
  const values = [username, hashedPassword, roles];

  try {
    await connection.query(sql, values).then(() => {
      res.status(201).json({
        status: 'success',
        code: 201,
        message: 'successfully registered user',
        data: values,
      });
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
  const sql = 'SELECT * FROM user_acc WHERE user_name = ?';
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
    const token = jwt.sign({ id: user.id, username: user.name }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '1h',
    });

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        status: 'success',
        code: 200,
        data: {
          user: user.user_name,
        },
      });
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
