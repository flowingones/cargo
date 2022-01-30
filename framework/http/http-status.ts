export enum HttpStatus {
  /*
   * Success Status
   */
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,

  /*
   * Redirection Status
   */
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 303,

  /*
   * Client Error Status
   */
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,

  /*
   * Server Error Status
   */
  INTERAL_ERROR = 500,
}
