import { deleteUser, DeleteUser } from "../model/userDelete.model.ts";
import { Request, Response } from "express";
import deleteUserPersister from "../Persister/userDelete.persister.ts";

const userDeleteController = async (
  req: Request<{}, {}, DeleteUser>,
  res: Response
) => {
  const parseResult = deleteUser.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.format() }); // Return validation errors
  }

  const userData = parseResult.data;

  await deleteUserPersister(userData);

  res.status(201).send("successfully deleted user");
};

export default userDeleteController;
