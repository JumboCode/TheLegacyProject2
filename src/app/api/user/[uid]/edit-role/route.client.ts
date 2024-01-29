import { TypedRequest } from "@server/type";
import { z } from "zod";
import { EditRoleRequest, EditRoleResponse } from "./route.schema";

export const editRole = async (
  request: TypedRequest<z.infer<typeof EditRoleRequest>>,
  uid: string
) => {
  const { body, ...options } = request;
  const response = await fetch(`/api/user/${uid}/edit-role`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
  return EditRoleResponse.parse(await response.json());
};
