import express from 'express';
import getArboMasterlistController from '../controllers/getArboMasterlist.controller.ts';
import asyncHandler from './asyncHandler.ts';

const getArboMasterlistRoutes = express.Router();

// get all the users
getArboMasterlistRoutes.get('/', asyncHandler(getArboMasterlistController));

export default getArboMasterlistRoutes;
