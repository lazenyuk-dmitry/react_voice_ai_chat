import { HttpErrorCode } from "@/types"

export class ApiError extends Error {
  constructor(
    message: string = 'Unknown Error',
    public errCode: HttpErrorCode = HttpErrorCode.INTERNAL_ERROR,
    public status: number = errCode,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
