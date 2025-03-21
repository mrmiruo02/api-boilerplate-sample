import express from "express";
import userDeleteController from "../controllers/userDeleteController";
import asyncHandler from "./asyncHandler";

const userDeleteRoute = express.Router();

// delete users
userDeleteRoute.delete("/", asyncHandler(userDeleteController));

export default userDeleteRoute;
