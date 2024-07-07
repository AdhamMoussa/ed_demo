import { api } from '@fe/core/utils/api'

import { SalaryPaymentsInput, SuccessOutput } from '@ed-demo/dto'

export const createSalaryPayments = async (dto: SalaryPaymentsInput) => {
  return api.url('/v1/salaries/payments').post(dto).json<SuccessOutput>()
}
