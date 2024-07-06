import { HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CustomHttpException } from '../common/CustomHttpException'

import { CreateOrgInput } from '@ed-demo/dto'
import { AuthUser } from '../user/types'

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(user: AuthUser, dto: CreateOrgInput) {
    if (user.organization) {
      throw new CustomHttpException(HttpStatus.UNPROCESSABLE_ENTITY, {
        message: 'User already has an organization',
      })
    }

    console.log(dto)
    const org = await this.prisma.organization.create({
      data: {
        ...dto,
        ownerId: user.id,
      },
    })

    return org
  }
}
