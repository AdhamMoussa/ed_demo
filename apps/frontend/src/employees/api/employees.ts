import { api } from '@fe/core/utils/api'

import {
  CreateEmployeeInput,
  EmployeeOutput,
  EmployeesLisInput,
  EmployeesListOutput,
} from '@ed-demo/dto'

export const getEmployees = async (dto: EmployeesLisInput) => {
  return api.query(dto).get('/v1/employees').json<EmployeesListOutput>()
}

export const createEmployee = async (dto: CreateEmployeeInput) => {
  return api.url('/v1/employees').post(dto).json<EmployeeOutput>()
}

export const editEmployee = async ({
  id,
  dto,
}: {
  id: string
  dto: CreateEmployeeInput
}) => {
  return api.url(`/v1/employees/${id}`).put(dto).json<EmployeeOutput>()
}

export const archiveEmployee = async ({ id }: { id: string }) => {
  return api.url(`/v1/employees/${id}/archive`).patch().json<EmployeeOutput>()
}
