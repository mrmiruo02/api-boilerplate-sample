import express from "express";
import userRegisterController from "../controllers/userRegisterController.ts";

const userRegisterRoute = express.Router();

// register users
userRegisterRoute.post("/", (req: express.Request, res: express.Response) => {
  userRegisterController(req, res);
});

export default userRegisterRoute;
