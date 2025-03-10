import express from "express";
import userGetController from "../controllers/userGetcontroller.ts";

const userGetRoute = express.Router();

// get all the users
userGetRoute.get("/", (req: express.Request, res: express.Response) => {
  userGetController(req, res);
});

export default userGetRoute;
