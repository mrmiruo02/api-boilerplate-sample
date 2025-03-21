import { deleteUser, DeleteUser } from "../model/userDelete.model.ts";
import { Request, Response } from "express";
import deleteUserPersister from "../Persister/userDelete.persister.ts";
import validationInput from "../components/validation.ts";

const userDeleteController = async (
  req: Request<{}, {}, DeleteUser>,
  res: Response
) => {
  const parseResult = deleteUser.safeParse(req.body);

  validationInput(parseResult); // Handles validation and throws if needed

  const userData = parseResult.data!;

  await deleteUserPersister(userData);

  res.status(201).send("successfully deleted user");
};

export default userDeleteController;
