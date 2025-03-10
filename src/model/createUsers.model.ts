import { z } from "zod";

export const inputUser = z.object({
  name: z.string().min(1, "Name is required"),
  nickname: z.string().min(1, "Nickname is required"),
});

export type InputUser = z.infer<typeof inputUser>;
