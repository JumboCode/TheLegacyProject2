import { z } from "zod";
import {
  HandleChapterRequest,
  HandleChapterRequestResponse,
} from "./route.schema";
import { TypedRequest } from "@server/type";

export const handleChapterRequest = async (
  request: TypedRequest<z.infer<typeof HandleChapterRequest>>
) => {
  const { body, ...options } = request;
  const response = await fetch("/api/handle-chapter-request", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return HandleChapterRequestResponse.parse(json);
};
