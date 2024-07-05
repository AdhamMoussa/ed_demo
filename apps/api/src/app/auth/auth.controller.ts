import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'

import { Validate } from '../common/decorators/validation.decorator'
import { Public } from '../common/decorators/public.decorator'

import {
  SigninInput,
  signinInputSchema,
  SignupInput,
  signupInputSchema,
} from '@ed-demo/dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @Validate(signupInputSchema)
  async signup(@Body() dto: SignupInput) {
    await this.authService.signup(dto)

    return { message: 'User created successfully' }
  }

  @Public()
  @Post('signin')
  @Validate(signinInputSchema)
  async signin(@Body() dto: SigninInput) {
    const token = await this.authService.signin(dto)

    return { token }
  }
}
