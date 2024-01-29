import { Prisma } from "@prisma/client";

export interface TypedRequest<T> extends Omit<RequestInit, "body" | "method"> {
  body: T;
}

export type ChapterWithStudent = Prisma.ChapterGetPayload<{
  include: { students: true };
}>;
