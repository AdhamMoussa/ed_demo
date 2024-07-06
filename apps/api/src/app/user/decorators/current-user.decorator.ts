import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext) =>
    context.switchToHttp().getRequest<Request>().user,
)
