export enum HttpErrorCode {
  // Успех
  OK = 200,
  CREATED = 201,

  // Ошибки клиента
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,

  // Ошибки сервера
  INTERNAL_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}
