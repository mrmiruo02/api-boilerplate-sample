import insertUser from "../Persister/insertUsers.Persister.ts";
import { inputUser, InputUser } from "../model/createUsers.model.ts";
import { Request, Response } from "express";

const userRegisterController = async (
  req: Request<{}, {}, InputUser>,
  res: Response
) => {
  const parseResult = inputUser.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.format() }); // Return validation errors
  }

  const userData = parseResult.data;

  await insertUser(userData);

  res.status(201).send("successfully registered user");
};

export default userRegisterController;
