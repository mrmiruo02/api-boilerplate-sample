import express from "express";
import userDeleteController from "../controllers/userDeleteController";

const userDeleteRoute = express.Router();

// delete users
userDeleteRoute.delete("/", (req: express.Request, res: express.Response) => {
  userDeleteController(req, res);
});

export default userDeleteRoute;
