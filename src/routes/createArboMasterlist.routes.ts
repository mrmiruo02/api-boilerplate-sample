import express from 'express';
import asyncHandler from '../utils/asyncHandler.util.ts';
import createArboMasterlistController from '../controllers/createArboMasterlist.controller.ts';

const createArboMasterlistRoute = express.Router();

// register users
createArboMasterlistRoute.post('/', asyncHandler(createArboMasterlistController.controller));

export default createArboMasterlistRoute;
