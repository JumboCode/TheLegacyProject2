/**
 * Extends fetch input parameters.
 */
interface ExtendedRequestInit extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}

declare function fetch(
  input: URL | RequestInfo,
  init?: ExtendedRequestInit
): Promise<Response>;
