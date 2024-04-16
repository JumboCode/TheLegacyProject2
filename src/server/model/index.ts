import { Senior } from "@prisma/client";
import { z } from "zod";

export const seniorSchema = z.object({
  id: z.string(),
  firstname: z.string().min(2, "Must be at least 2 characters"),
  lastname: z.string(),
  location: z.string(),
  dateCreated: z.coerce.date(),
  description: z.string(),
  StudentIDs: z.array(z.string()),
  folder: z.string(),
  ChapterID: z.string(),
}) satisfies z.ZodType<Senior>;

export const File = z.object({
  date: z.string().transform((val) => {
    const date = new Date(val);
    date.setHours(0, 0, 0, 0);
    return date;
  }),
  filetype: z.string(),
  url: z.string(),
  Tags: z.array(z.string()),
  seniorId: z.string(),
});
