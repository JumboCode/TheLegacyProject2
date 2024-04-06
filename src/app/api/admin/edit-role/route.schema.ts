import { z } from "zod";

export const EditRoleRequest = z.object({
  chapterLeaders: z.array(z.string()),
  users: z.array(z.string()),
});

export const EditRoleResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.string(),
  }),
  z.object({
    code: z.literal("INVALID_REQUEST"),
    message: z.string(),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.string(),
  }),
]);
