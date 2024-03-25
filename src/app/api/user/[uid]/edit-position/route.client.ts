import { TypedRequest } from "@server/type";
import { z } from "zod";
import { editPositionRequest, editPositionResponse } from "./route.schema";

export const editPosition = async (
  request: TypedRequest<z.infer<typeof editPositionRequest>>,
  uid: string
) => {
  const { body, ...options } = request;
  const response = await fetch(`/api/user/${uid}/edit-position`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
  return editPositionResponse.parse(await response.json());
};
