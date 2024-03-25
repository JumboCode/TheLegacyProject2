import { z } from "zod";

export const editPositionRequest = z.object({
  position: z.string(),
});

export const editPositionResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
  }),
]);
