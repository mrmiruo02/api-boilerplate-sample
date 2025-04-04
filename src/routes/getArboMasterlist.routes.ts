import express from 'express';
import getArboMasterlistController from '../controllers/getArboMasterlist.controller.ts';
import asyncHandler from './asyncHandler.ts';

const userGetRoute = express.Router();

// get all the users
userGetRoute.get('/', asyncHandler(getArboMasterlistController));

export default userGetRoute;
