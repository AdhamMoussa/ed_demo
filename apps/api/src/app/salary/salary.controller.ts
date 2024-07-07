import { Body, Controller, Post } from '@nestjs/common'

import { SalaryService } from './salary.service'

import { Validate } from '../common/decorators/validation.decorator'
import { CurrentUser } from '../user/decorators/current-user.decorator'

import { AuthUser } from '../user/types'
import { SalaryPaymentsInput, salaryPaymentsInputSchema } from '@ed-demo/dto'

@Controller('salaries')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post('payments')
  @Validate(salaryPaymentsInputSchema)
  async createSalaryPayments(
    @CurrentUser() user: AuthUser,
    @Body() dto: SalaryPaymentsInput,
  ) {
    await this.salaryService.createSalaryPayments(user, dto)

    return { message: 'Salary payments created successfully' }
  }
}
