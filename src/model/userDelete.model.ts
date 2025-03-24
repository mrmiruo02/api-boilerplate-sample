import { RowDataPacket } from "mysql2";
import { z } from "zod";

export interface searchResults extends RowDataPacket {
  id: number;
  name: string;
  nickname: string;
}

export const deleteUser = z.object({
  id: z.number().min(1, "id is required"),
});

export type DeleteUser = z.infer<typeof deleteUser>;
