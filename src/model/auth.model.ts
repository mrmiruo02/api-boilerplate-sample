import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

export const iAuthentication = z.array(
  z.object({
    user_name: z.string(),
    password: z.string(),
  })
);

export type IAuthentication = z.infer<typeof iAuthentication> & RowDataPacket;
