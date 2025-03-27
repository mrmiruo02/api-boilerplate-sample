import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

export const userDeleteResModel = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
});

export type UserDeleteResModel = z.infer<typeof userDeleteResModel> &
  RowDataPacket;

export const userDeleteReqModel = z.object({
  id: z.number().min(1, 'id is required'),
});

export type UserDeleteReqModel = z.infer<typeof userDeleteReqModel>;
