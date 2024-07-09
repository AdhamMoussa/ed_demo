import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WretchError } from 'wretch'

import { archiveEmployee } from '@fe/employees/api/employees'

import { EMPLOYEES_LIST_QUERY_KEY } from '../queries/useEmployeesListQuery'

import { EmployeeOutput } from '@ed-demo/dto'

export const useArchiveEmployeeMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<EmployeeOutput, WretchError, { id: string }>({
    mutationFn: archiveEmployee,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [EMPLOYEES_LIST_QUERY_KEY] })
    },
  })

  return mutation
}
