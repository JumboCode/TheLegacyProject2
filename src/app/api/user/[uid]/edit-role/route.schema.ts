import { roleSchema } from "@server/schema";
import { z } from "zod";

export const EditRoleRequest = z.object({
  role: roleSchema.refine(
    (value): value is "CHAPTER_LEADER" | "USER" =>
      value === "CHAPTER_LEADER" || value === "USER"
  ),
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
