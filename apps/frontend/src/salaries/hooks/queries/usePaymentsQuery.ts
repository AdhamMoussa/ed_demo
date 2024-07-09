import { QueryFunction, useQuery } from '@tanstack/react-query'
import { WretchError } from 'wretch'

import { getPayments } from '@fe/salaries/api/salaries'

import { SalaryPaymentsInput, SalaryPaymentsOutput } from '@ed-demo/dto'

type PaymentsQueryKey = [string, SalaryPaymentsInput]

export const PAYMENTS_QUERY_KEY = '/salaries/payments'

export const getPaymentsListQueryKey = (
  args: SalaryPaymentsInput,
): PaymentsQueryKey => [PAYMENTS_QUERY_KEY, args]

const queryFn: QueryFunction<SalaryPaymentsOutput, PaymentsQueryKey> = ({
  queryKey: [, dto],
}) => getPayments(dto)

export const usePaymentsQuery = (args: SalaryPaymentsInput) => {
  const query = useQuery<
    SalaryPaymentsOutput,
    WretchError,
    SalaryPaymentsOutput,
    PaymentsQueryKey
  >({
    queryKey: getPaymentsListQueryKey(args),
    queryFn,
  })

  return query
}
