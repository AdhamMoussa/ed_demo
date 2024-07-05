import { BadRequestException, Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

import { SigninInput, SignupInput } from '@ed-demo/dto'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: SignupInput) {
    const { email, password } = dto

    // skipped password encryption

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      throw new BadRequestException({
        message: 'Validation Error',
        fields: {
          email: 'Email already in use',
        },
      })
    }

    await this.prisma.user.create({
      data: { email, password },
    })
  }

  async signin(dto: SigninInput) {
    const { email, password } = dto

    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new BadRequestException({
        message: 'Email or password is incorrect',
      })
    }

    if (user.password !== password) {
      throw new BadRequestException({
        message: 'Email or password is incorrect',
      })
    }

    const token = Math.random().toString(36).substring(7)

    await this.prisma.user.update({
      where: { id: user.id },
      data: { token },
    })

    return token
  }
}
