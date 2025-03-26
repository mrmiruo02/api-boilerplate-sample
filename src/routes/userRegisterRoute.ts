import express from 'express';
import userRegisterController from '../controllers/userRegisterController.ts';
import asyncHandler from './asyncHandler.ts';

const userRegisterRoute = express.Router();

// register users
userRegisterRoute.post('/', asyncHandler(userRegisterController));

export default userRegisterRoute;
