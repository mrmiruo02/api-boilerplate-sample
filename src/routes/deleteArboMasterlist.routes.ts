import express from 'express';
import deleteArboMasterlistController from '../controllers/deleteArboMasterlist.controller';
import asyncHandler from './asyncHandler';

const deleteArboMasterlistRoutes = express.Router();

// delete users
deleteArboMasterlistRoutes.delete('/', asyncHandler(deleteArboMasterlistController.controller));

export default deleteArboMasterlistRoutes;
