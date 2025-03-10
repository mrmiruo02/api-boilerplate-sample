import { RowDataPacket } from "mysql2";
import { z } from "zod";

const userGetModel = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
});

export const userListModel = z.array(userGetModel);

interface resultModel extends RowDataPacket {
  id: number;
  name: string;
  nickname: string;
}

type UserGetModel = z.infer<typeof userListModel>;

export { UserGetModel, resultModel };
