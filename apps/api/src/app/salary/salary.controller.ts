import { Body, Controller, Get, Post, Query } from '@nestjs/common'

import { SalaryService } from './salary.service'

import { Validate } from '../common/decorators/validation.decorator'
import { CurrentUser } from '../user/decorators/current-user.decorator'

import { AuthUser } from '../user/types'
import {
  CreateSalaryPaymentsInput,
  createSalaryPaymentsInputSchema,
  SalaryPaymentsInput,
  salaryPaymentsInputSchema,
} from '@ed-demo/dto'

@Controller('salaries')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post('payments')
  @Validate(createSalaryPaymentsInputSchema)
  async createSalaryPayments(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreateSalaryPaymentsInput,
  ) {
    await this.salaryService.createSalaryPayments(user, dto)

    return { message: 'Salary payments created successfully' }
  }

  @Get('payments')
  @Validate(salaryPaymentsInputSchema, 'query')
  async getSalaryPayments(
    @CurrentUser() user: AuthUser,
    @Query() params: SalaryPaymentsInput,
  ) {
    return this.salaryService.getSalaryPayments(user, params)
  }
}
