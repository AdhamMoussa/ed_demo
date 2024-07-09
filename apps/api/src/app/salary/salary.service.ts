import { HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CustomHttpException } from '../common/CustomHttpException'

import { AuthUser } from '../user/types'
import {
  CreateSalaryPaymentsInput,
  SalaryPaymentsInput,
  SalaryPaymentsOutput,
} from '@ed-demo/dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class SalaryService {
  constructor(private readonly prisma: PrismaService) {}

  async createSalaryPayments(user: AuthUser, dto: CreateSalaryPaymentsInput) {
    const { payments } = dto

    if (!user.organization) {
      throw new CustomHttpException(HttpStatus.FORBIDDEN, {
        message: 'User does not belong to any organization',
      })
    }

    await this.prisma.salaryPayment.createMany({
      data: payments,
    })

    const endOfServiceEmployeesIds = payments
      .filter(payment => payment.isGratuity)
      .map(({ employeeId }) => employeeId)

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

  async getSalaryPayments(
    user: AuthUser,
    dto: SalaryPaymentsInput,
  ): Promise<SalaryPaymentsOutput> {
    const { search, page = 1, limit = 10 } = dto

    if (!user.organization) {
      throw new CustomHttpException(HttpStatus.FORBIDDEN, {
        message: 'User does not belong to any organization',
      })
    }

    const query: Prisma.SalaryPaymentWhereInput = {
      employee: {
        organizationId: user.organization.id,
      },
      OR: [
        { employee: { firstName: { contains: search, mode: 'insensitive' } } },
        { employee: { lastName: { contains: search, mode: 'insensitive' } } },
        { employee: { staffId: { contains: search, mode: 'insensitive' } } },
      ],
    }

    const payments = await this.prisma.salaryPayment.findMany({
      where: query,
      include: {
        employee: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    const count = await this.prisma.salaryPayment.count({
      where: query,
    })

    return {
      count,
      limit,
      page,
      items: payments.map(payment => ({
        id: payment.id,
        employeeId: payment.employeeId,
        emplyeeName: `${payment.employee.firstName} ${payment.employee.lastName}`,
        basicSalary: payment.basicSalary,
        allowances: payment.allowances,
        additions: payment.additions,
        deductions: payment.deductions,
        month: payment.month.toISOString(),
        isGratuity: !!payment.isGratuity,
        paymentDate: payment.paymentDate.toISOString(),
      })),
    }
  }
}
