import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

export const userGetReqModel = z.object({
  id: z.number().optional(),
});

export type UserGetReqModel = z.infer<typeof userGetReqModel>;

export const userGetResModel = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    nickname: z.string(),
  })
);

export type UserGetResModel = z.infer<typeof userGetResModel> & RowDataPacket;
