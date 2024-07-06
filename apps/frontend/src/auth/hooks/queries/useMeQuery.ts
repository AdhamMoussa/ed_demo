import { useQuery } from '@tanstack/react-query'
import { WretchError } from 'wretch'

import { getMe } from '@fe/auth/api/auth'

import { MeOutput } from '@ed-demo/dto'

type MeQueryKey = [string]

export const ME_QUERY_KEY = '/users/me'
export const getMeQueryKey = (): MeQueryKey => [ME_QUERY_KEY]

export const useMeQuery = () => {
  const query = useQuery<MeOutput, WretchError, MeOutput, MeQueryKey>({
    queryKey: getMeQueryKey(),
    queryFn: getMe,
  })

  return query
}
