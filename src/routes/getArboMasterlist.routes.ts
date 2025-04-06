import express from 'express';
import getArboMasterlistController from '../controllers/getArboMasterlist.controller.ts';
import asyncHandler from '../utils/asyncHandler.util.ts';

const getArboMasterlistRoutes = express.Router();

// get all the users
getArboMasterlistRoutes.get('/', asyncHandler(getArboMasterlistController.controller));

export default getArboMasterlistRoutes;
