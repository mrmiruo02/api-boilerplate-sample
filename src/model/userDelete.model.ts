import { z } from "zod";

export const deleteUser = z.object({
  id: z.number().min(1, "id is required"),
});

export type DeleteUser = z.infer<typeof deleteUser>;
