import { ErrorOutput } from '@ed-demo/dto'
import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomHttpException extends HttpException {
  constructor(status: HttpStatus, response: ErrorOutput) {
    super(response, status)
  }
}
