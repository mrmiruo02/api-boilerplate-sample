import { z } from "zod";

export const userCreateReqModel = z.object({
  name: z.string().min(1, "Name is required"),
  nickname: z.string().min(1, "Nickname is required"),
});

export type UserCreateReqModel = z.infer<typeof userCreateReqModel>;
