import { z } from "zod";

export const deleteChapterResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("The chapter was successfully deleted"),
  }),

  z.object({
    code: z.literal("CHAPTER_NOT_FOUND"),
    message: z.literal("The chapter id could not be found"),
  }),
]);
