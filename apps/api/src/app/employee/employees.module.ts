import { Module } from '@nestjs/common'

import { EmployeeService } from './employee.service'
import { EmployeesController } from './employees.controller'

@Module({
  controllers: [EmployeesController],
  providers: [EmployeeService],
})
export class EmployeesModule {}
