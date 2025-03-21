import express from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { dbConfig } from "./config/db.config.ts";
import { IAuthentication } from "./model/auth.model.ts";
import AuthorizationError from "./errors/authorizationError.ts";

dotenv.config();

const app = express();

// Middleware to Verify JWT
export const authenticateToken: any = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY as string, (error: any, decoded: any) => {
      if (error) {
        throw new AuthorizationError(error);
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    throw new AuthorizationError(
      [
        {
          name: 'AuthorizationError',
          message: 'Authentication Error: Invalid Access Token'
        }
      ]
    );
  }
};

// Register user
export const registerAuth = app.post("/auth/register", async (req, res, next) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO auth_acc (name, password) VALUES (?, ?)";
  const values = [username, hashedPassword];

  try {
    await dbConfig.connection.query(sql, values)
      .then(() => {
        res.status(201).json({ message: "User registered successfully!" });
      })
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
export const loginAuth = app.get("/auth/login", async (req, res, next) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM auth_acc WHERE name = ?";
  const values = [username];

  try {
    const result = await dbConfig.connection.query<IAuthentication[]>(sql, values);
    const user = result[0][0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AuthorizationError([
        {
          name: 'AuthorizationError',
          message: 'Invalid credentials!'
        }
      ])
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, username: user.name }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1h"
    });

    res.json({ token, user: { id: user.id, name: user.name } });
  } catch (err: any) {
    return next(new AuthorizationError([
      {
        name: 'AuthorizationError',
        message: 'Invalid credentials!'
      }
    ]))
  }
});