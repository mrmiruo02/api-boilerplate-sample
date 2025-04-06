import express from 'express';
import asyncHandler from '../utils/asyncHandler.util.ts';
import updateArboMasterlistController from '../controllers/updateArboMasterlist.controller.ts';

const updateArboMasterlistRoute = express.Router();

// get all the users
updateArboMasterlistRoute.put('/', asyncHandler(updateArboMasterlistController.controller));

export default updateArboMasterlistRoute;
