import { z } from "zod";
import { Email, EmailResponse } from "./route.schema";
import { TypedRequest } from "@server/type";

export const createEmailRequest = async (
  request: TypedRequest<z.infer<typeof Email>>
) => {
  const { body, ...options } = request;
  const response = await fetch("/api/emails", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return EmailResponse.parse(json);
};
