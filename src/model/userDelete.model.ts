import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

export interface SearchResults extends RowDataPacket {
  id: number;
  name: string;
  nickname: string;
}

export const userDeleteReqModel = z.object({
  id: z.number().min(1, 'id is required'),
});

export type UserDeleteReqModel = z.infer<typeof userDeleteReqModel>;
