import { HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CustomHttpException } from '../common/CustomHttpException'

import { AuthUser } from '../user/types'
import { SalaryPaymentsInput } from '@ed-demo/dto'

@Injectable()
export class SalaryService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalaryPayments(user: AuthUser, dto: SalaryPaymentsInput) {
    const { payments } = dto

    if (!user.organization) {
      throw new CustomHttpException(HttpStatus.FORBIDDEN, {
        message: 'User does not belong to any organization',
      })
    }

    await this.prisma.salaryPayment.createMany({
      data: Object.entries(payments).map(([employeeId, payment]) => ({
        employeeId,
        ...payment,
      })),
    })

    const endOfServiceEmployeesIds = Object.entries(payments)
      .filter(([, payment]) => payment.isGratuity)
      .map(([employeeId]) => employeeId)

    if (endOfServiceEmployeesIds.length) {
      await this.prisma.employee.updateMany({
        where: {
          id: {
            in: endOfServiceEmployeesIds,
          },
        },
        data: {
          isArchived: true,
        },
      })
    }
  }
}
