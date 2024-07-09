import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WretchError } from 'wretch'

import { createSalaryPayments } from '@fe/salaries/api/salaries'

import { PAYMENTS_QUERY_KEY } from '../queries/usePaymentsQuery'
import { EMPLOYEES_LIST_QUERY_KEY } from '@fe/employees/hooks/queries/useEmployeesListQuery'

import { CreateSalaryPaymentsInput, SuccessOutput } from '@ed-demo/dto'

export const useCreateSalaryPaymentsMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    SuccessOutput,
    WretchError,
    CreateSalaryPaymentsInput
  >({
    mutationFn: createSalaryPayments,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_LIST_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] })
    },
  })

  return mutation
}
