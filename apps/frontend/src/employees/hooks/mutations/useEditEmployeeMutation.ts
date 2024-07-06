import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WretchError } from 'wretch'

import { editEmployee } from '@fe/employees/api/employees'

import { EMPLOYEES_LIST_QUERY_KEY } from '../queries/useEmployeesListQuery'

import { CreateEmployeeInput, EmployeeOutput } from '@ed-demo/dto'

export const useEditEmployeeMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<
    EmployeeOutput,
    WretchError,
    { id: string; dto: CreateEmployeeInput }
  >({
    mutationFn: editEmployee,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_LIST_QUERY_KEY] })
    },
  })

  return mutation
}
