import { z } from "zod";

export const HandleChapterRequest = z.object({
  chapterRequestId: z.string(),
  approved: z.boolean(),
});

export const HandleChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Chapter request successfully handled"),
  }),
  z.object({
    code: z.literal("INVALID_REQUEST"),
    message: z.literal("Invalid API request"),
  }),
]);
