import { Body, Controller, Post } from '@nestjs/common'

import { OrganizationService } from './organization.service'

import { Validate } from '../common/decorators/validation.decorator'
import { CurrentUser } from '../user/decorators/current-user.decorator'

import { CreateOrgInput, createOrgInputSchema } from '@ed-demo/dto'
import { AuthUser } from '../user/types'

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('/')
  @Validate(createOrgInputSchema)
  async createOrganization(
    @CurrentUser() user: AuthUser,
    @Body() params: CreateOrgInput,
  ) {
    return this.organizationService.createOrganization(user, params)
  }
}
