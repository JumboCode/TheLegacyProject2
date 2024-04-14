import { TypedRequest } from "@server/type";
import { seniorPostResponse, IPostSeniorRequestSchema } from "./route.schema";

export const postSenior = async (
  request: TypedRequest<IPostSeniorRequestSchema>
) => {
  const { body, ...options } = request;

  const response = await fetch(`/api/senior/`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return seniorPostResponse.parse(json);
};
