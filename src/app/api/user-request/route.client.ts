import { z } from "zod";
import {
  JoinChapterRequest,
  ManageChapterRequest,
  JoinChapterRequestResponse,
  ManageChapterRequestResponse,
} from "./route.schema";
import { TypedRequest } from "@server/type";

type AcceptOrDenyRequest = TypedRequest<z.infer<typeof ManageChapterRequest>>;

export const handleJoinChapterRequest = async (
  request: TypedRequest<z.infer<typeof JoinChapterRequest>>
) => {
  const { body, ...options } = request;
  const response = await fetch("/api/user-request", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return JoinChapterRequestResponse.parse(json);
};

export const handleManageChapterRequest = async (
  request: AcceptOrDenyRequest
) => {
  const { body, ...options } = request;
  const response = await fetch("/api/user-request", {
    method: "DELETE",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return ManageChapterRequestResponse.parse(json);
};

export const handleAcceptChapterRequest = async (
  request: AcceptOrDenyRequest
) => {
  const { body, ...options } = request;
  const response = await fetch("/api/user-request", {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return ManageChapterRequestResponse.parse(json);
};
