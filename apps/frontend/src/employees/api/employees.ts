import { api } from '@fe/core/utils/api'

import { EmployeesLisInput, EmployeesListOutput } from '@ed-demo/dto'

export const getEmployees = async (dto: EmployeesLisInput) => {
  return api.query(dto).get('/v1/employees').json<EmployeesListOutput>()
}
