import { Prisma } from '@prisma/client'
import { HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

import { CustomHttpException } from '../common/CustomHttpException'

import {
  CreateEmployeeInput,
  EmployeeOutput,
  employeeOutputSchema,
  EmployeesLisInput,
  EmployeesListOutput,
  employeesListOutputSchema,
} from '@ed-demo/dto'

import { AuthUser } from '../user/types'

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async getEmployees(
    user: AuthUser,
    dto: EmployeesLisInput,
  ): Promise<EmployeesListOutput> {
    const { search, page = 1, limit = 10 } = dto

    if (!user.organization) {
      throw new CustomHttpException(HttpStatus.BAD_REQUEST, {
        message: 'User does not belong to any organization',
      })
    }

    const query: Prisma.EmployeeWhereInput = {
      organizationId: user.organization.id,
      isArchived: false,
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { staffId: { contains: search, mode: 'insensitive' } },
      ],
    }

    const employees = await this.prisma.employee.findMany({
      where: query,
      take: limit,
      skip: (page - 1) * limit,
      include: {
        salaryPayments: {
          select: {
            month: true,
          },
        },
      },
    })

    const count = await this.prisma.employee.count({
      where: query,
    })

    return employeesListOutputSchema.parseAsync({
      count,
      limit,
      page,
      items: employees.map(employee => ({
        ...employee,
        salaryPayments: employee.salaryPayments.map(payment => ({
          month: payment.month.toISOString(),
        })),
        joinedAt: employee.joinedAt.toISOString(),
      })),
    })
  }

  async createEmployee(user: AuthUser, dto: CreateEmployeeInput) {
    if (!user.organization) {
      throw new CustomHttpException(HttpStatus.BAD_REQUEST, {
        message: 'User does not belong to any organization',
      })
    }

    const employee = await this.prisma.employee.create({
      data: {
        ...dto,
        organizationId: user.organization.id,
      },
      include: {
        salaryPayments: true,
      },
    })

    return employeeOutputSchema.parseAsync({
      ...employee,
      joinedAt: employee.joinedAt.toISOString(),
      salaryPayments: employee.salaryPayments.map(payment => ({
        month: payment.month.toISOString(),
      })),
    })
  }

  async editEmployee(user: AuthUser, id: string, dto: CreateEmployeeInput) {
    if (!user.organization) {
      throw new CustomHttpException(HttpStatus.BAD_REQUEST, {
        message: 'User does not belong to any organization',
      })
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id, organizationId: user.organization.id },
    })

    if (!employee) {
      throw new CustomHttpException(HttpStatus.NOT_FOUND, {
        message: 'Employee not found',
      })
    }

    const updatedEmployee = await this.prisma.employee.update({
      where: { id },
      data: dto,
      include: {
        salaryPayments: true,
      },
    })

    return employeeOutputSchema.parseAsync({
      ...updatedEmployee,
      joinedAt: updatedEmployee.joinedAt.toISOString(),
      salaryPayments: updatedEmployee.salaryPayments.map(payment => ({
        month: payment.month.toISOString(),
      })),
    })
  }

  async archiveEmployee(
    user: AuthUser,
    employeeId: string,
  ): Promise<EmployeeOutput> {
    if (!user.organization) {
      throw new CustomHttpException(HttpStatus.BAD_REQUEST, {
        message: 'User does not belong to any organization',
      })
    }

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId, organizationId: user.organization.id },
    })

    if (!employee) {
      throw new CustomHttpException(HttpStatus.NOT_FOUND, {
        message: 'Employee not found',
      })
    }

    const updatedEmployee = await this.prisma.employee.update({
      where: { id: employeeId },
      data: { isArchived: true },
      include: {
        salaryPayments: true,
      },
    })

    return employeeOutputSchema.parseAsync({
      ...updatedEmployee,
      joinedAt: updatedEmployee.joinedAt.toISOString(),
      salaryPayments: updatedEmployee.salaryPayments.map(payment => ({
        month: payment.month.toISOString(),
      })),
    })
  }
}
