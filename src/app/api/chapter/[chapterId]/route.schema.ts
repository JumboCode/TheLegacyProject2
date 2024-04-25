import { z } from "zod";

export const DeleteChapterResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("The chapter was successfully deleted"),
  }),

  z.object({
    code: z.literal("INVALID_CHAPTER_ID"),
    message: z.literal("The chapter id could not be found"),
  }),

  z.object({
    code: z.literal("INVALID_REQUEST"),
    data: z.literal("The request was invalid"),
  }),

  z.object({
    code: z.literal("UNKNOWN"),
    data: z.any(),
  }),
]);
