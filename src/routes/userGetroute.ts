import express from 'express';
import userGetController from '../controllers/userGetcontroller.ts';
import asyncHandler from './asyncHandler.ts';

const userGetRoute = express.Router();

// get all the users
userGetRoute.get('/', asyncHandler(userGetController));

export default userGetRoute;
