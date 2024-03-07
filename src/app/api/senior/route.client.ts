import { seniorPostResponse, IPostSeniorRequestSchema } from "./route.schema";

interface IPostSeniorRequest extends Omit<RequestInit, "body"> {
  body: IPostSeniorRequestSchema;
}

export const postSenior = async (request: IPostSeniorRequest) => {
  const { body, ...options } = request;

  const response = await fetch(`/api/senior/`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return seniorPostResponse.parse(json);
};
