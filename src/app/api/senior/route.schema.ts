import { z } from "zod";
import { unauthorizedErrorSchema, unknownErrorSchema } from "../route.schema";
import { seniorSchema } from "@server/model";

export const postSeniorSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  location: z.string(),
  description: z.string(),
  StudentIDs: z.array(z.string()),
});

export type IPostSeniorRequestSchema = z.infer<typeof postSeniorSchema>;

export const seniorPostResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS"), data: seniorSchema }),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);
