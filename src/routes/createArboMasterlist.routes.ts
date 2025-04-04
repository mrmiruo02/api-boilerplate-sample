import express from 'express';
import asyncHandler from './asyncHandler.ts';
import createArboMasterlistController from '../controllers/createArboMasterlist.controller.ts';

const createArboMasterlistRoute = express.Router();

// register users
createArboMasterlistRoute.post('/', asyncHandler(createArboMasterlistController));

export default createArboMasterlistRoute;
