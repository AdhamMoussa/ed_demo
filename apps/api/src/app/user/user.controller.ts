import { Controller, Get } from '@nestjs/common'

import { CurrentUser } from './decorators/current-user.decorator'

import { meOutputSchema } from '@ed-demo/dto'

import { AuthUser } from './types'

@Controller('users')
export class UserController {
  @Get('me')
  getMe(@CurrentUser() user: AuthUser) {
    return meOutputSchema.parseAsync(user)
  }
}
