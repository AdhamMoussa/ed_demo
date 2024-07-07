import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { OrganizationModule } from './organization/organization.module'
import { EmployeesModule } from './employee/employees.module'
import { SalaryModule } from './salary/salary.module'

import { envSchema } from '../config/env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envSchema,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    OrganizationModule,
    EmployeesModule,
    SalaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
