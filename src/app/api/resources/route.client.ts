import { z } from "zod";
import {
  batchCreateRequestSchema,
  batchDeleteRequestSchema,
  batchUpdateRequestSchema,
  batchResponseSchema,
} from "./route.schema";

interface IBatchCreateRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof batchCreateRequestSchema>;
}

interface IBatchUpdateRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof batchUpdateRequestSchema>;
}

interface IBatchDeleteRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof batchDeleteRequestSchema>;
}

export const batchCreateResources = async (request: IBatchCreateRequest) => {
  const { body, ...options } = request;
  const response = await fetch("/api/resources/", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return batchResponseSchema.parse(json);
};

export const batchUpdateResources = async (request: IBatchUpdateRequest) => {
  const { body, ...options } = request;
  const response = await fetch("/api/resources", {
    method: "PUT",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return batchResponseSchema.parse(json);
};

export const batchDeleteResources = async (request: IBatchDeleteRequest) => {
  const { body, ...options } = request;
  const response = await fetch("/api/resources", {
    method: "DELETE",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return batchResponseSchema.parse(json);
};
