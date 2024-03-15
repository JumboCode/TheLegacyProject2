import { z } from "zod";
import { unauthorizedErrorSchema, unknownErrorSchema } from "../route.schema";
import { seniorSchema } from "@server/model";

export const postSeniorSchema = seniorSchema.pick({
  firstname: true,
  lastname: true,
  location: true,
  StudentIDs: true,
  description: true,
});

export type IPostSeniorRequestSchema = z.infer<typeof postSeniorSchema>;

export const seniorPostResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS"), data: seniorSchema }),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);
