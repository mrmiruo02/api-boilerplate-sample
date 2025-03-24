import { RowDataPacket } from "mysql2";
import { z } from "zod";

export const userReqModel = z.object({
  id: z.number().optional()
})

export type UserReqModel = z.infer<typeof userReqModel>;

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
