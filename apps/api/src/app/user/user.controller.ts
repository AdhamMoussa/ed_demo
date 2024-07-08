import { Body, Controller, Get, Post } from '@nestjs/common'

import { UserService } from './user.service'

import { CurrentUser } from './decorators/current-user.decorator'
import { Validate } from '../common/decorators/validation.decorator'

import { AuthUser } from './types'
import {
  CreateProfileInput,
  createProfileInputSchema,
  meOutputSchema,
} from '@ed-demo/dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: AuthUser) {
    return meOutputSchema.parseAsync(user)
  }

  @Post('/profile')
  @Validate(createProfileInputSchema)
  async createProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateProfileInput,
  ) {
    await this.userService.createProfile(user, dto)

    return { message: 'Profile created successfully' }
  }
}
