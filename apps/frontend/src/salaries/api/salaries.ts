import { api } from '@fe/core/utils/api'

import {
  CreateSalaryPaymentsInput,
  SalaryPaymentsInput,
  SalaryPaymentsOutput,
  SuccessOutput,
} from '@ed-demo/dto'

export const createSalaryPayments = async (dto: CreateSalaryPaymentsInput) => {
  return api.url('/v1/salaries/payments').post(dto).json<SuccessOutput>()
}

export const getPayments = async (dto: SalaryPaymentsInput) => {
  return api
    .query(dto)
    .get('/v1/salaries/payments')
    .json<SalaryPaymentsOutput>()
}
