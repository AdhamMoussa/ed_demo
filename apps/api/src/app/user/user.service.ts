import { HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CustomHttpException } from '../common/CustomHttpException'

import { AuthUser } from './types'
import { CreateProfileInput } from '@ed-demo/dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(user: AuthUser, dto: CreateProfileInput) {
    if (user.profile) {
      throw new CustomHttpException(HttpStatus.BAD_REQUEST, {
        message: 'Profile already exists',
      })
    }

    await this.prisma.profile.create({
      data: {
        userId: user.id,
        ...dto,
      },
    })
  }
}
