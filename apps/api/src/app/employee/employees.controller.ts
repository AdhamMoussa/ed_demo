import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common'

import { EmployeeService } from './employee.service'

import { Validate } from '../common/decorators/validation.decorator'
import { CurrentUser } from '../user/decorators/current-user.decorator'

import {
  CreateEmployeeInput,
  createEmployeeInputSchema,
  EmployeesLisInput,
  employeesListInputSchema,
} from '@ed-demo/dto'
import { AuthUser } from '../user/types'

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeeService) {}

  @Get('/')
  @Validate(employeesListInputSchema, 'query')
  async getEmployees(
    @CurrentUser() user: AuthUser,
    @Query() params: EmployeesLisInput,
  ) {
    return this.employeesService.getEmployees(user, params)
  }

  @Post('/')
  @Validate(createEmployeeInputSchema)
  async createEmployee(
    @CurrentUser() user: AuthUser,
    @Body() params: CreateEmployeeInput,
  ) {
    return this.employeesService.createEmployee(user, params)
  }

  @Put('/:id')
  @Validate(createEmployeeInputSchema)
  async editEmployee(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() params: CreateEmployeeInput,
  ) {
    return this.employeesService.editEmployee(user, id, params)
  }
}
