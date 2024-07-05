import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthGuard } from './guards/auth.guard'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
