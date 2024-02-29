import { z } from "zod";
import {
  unauthorizedErrorSchema,
  unknownErrorSchema,
} from "../../route.schema";
import { seniorSchema } from "@server/model";

export const seniorDeleteResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS") }),
  z.object({
    code: z.literal("NOT_FOUND"),
    message: z.string(),
  }),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);

export const patchSeniorSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  location: z.string(),
  description: z.string(),
  StudentIDs: z.array(z.string()),
});

export type ISeniorSchema = z.infer<typeof seniorSchema>;

export type IPatchSeniorRequestSchema = z.infer<typeof patchSeniorSchema>;

export const seniorPatchResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS"), data: seniorSchema }),
  z.object({
    code: z.literal("NOT_FOUND"),
    message: z.string(),
  }),
  z.object({ code: z.literal("INVALID_EDIT") }),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);
