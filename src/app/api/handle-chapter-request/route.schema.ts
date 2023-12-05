import { z } from "zod";

export const HandleChapterRequest = z.object({
  chapterRequestId: z.string(),
  approved: z.boolean(),
});

export const HandleChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS_ACCEPTED"),
    message: z.literal("Chapter request successfully accepted"),
  }),
  z.object({
    code: z.literal("SUCCESS_DECLINED"),
    message: z.literal("Chapter request successfully declined"),
  }),
  z.object({
    code: z.literal("INVALID_REQUEST"),
    message: z.literal("Invalid API request"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Unknown error received"),
  }),
  z.object({
    code: z.literal("CHAPTER_REQUEST_NOT_FOUND"),
    message: z.literal(
      "A chapter request associated with the given ID does not exist"
    ),
  }),
]);