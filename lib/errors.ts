import { HttpError } from "@/types"

export class ApiError extends Error {
  constructor(
    message: string = 'Unknown Error',
    public errCode: HttpError = HttpError.INTERNAL_ERROR,
    public status: number = errCode,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
