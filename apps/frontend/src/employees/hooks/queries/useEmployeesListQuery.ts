import { QueryFunction, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { getEmployees } from '@fe/employees/api/employees'

import { EmployeesLisInput, EmployeesListOutput } from '@ed-demo/dto'

type EmployeesListQueryKey = [string, EmployeesLisInput]

export const EMPLOYEES_LIST_QUERY_KEY = '/employees'

export const getEmployeesListQueryKey = (
  args: EmployeesLisInput,
): EmployeesListQueryKey => [EMPLOYEES_LIST_QUERY_KEY, args]

const queryFn: QueryFunction<EmployeesListOutput, EmployeesListQueryKey> = ({
  queryKey: [, dto],
}) => getEmployees(dto)

export const useEmployeesListQuery = (args: EmployeesLisInput) => {
  const query = useQuery<
    EmployeesListOutput,
    AxiosError,
    EmployeesListOutput,
    EmployeesListQueryKey
  >({
    queryKey: getEmployeesListQueryKey(args),
    queryFn,
  })

  return query
}
