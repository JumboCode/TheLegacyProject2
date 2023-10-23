export enum Status {
  // Accepted status
  OK = 200,

  // Client-error status
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,

  // Server-error status
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
}
