import { useMeQuery } from '@fe/auth/hooks/queries/useMeQuery'

export const useCurrentOrg = () => {
  const { data: userData } = useMeQuery()

  return userData?.organization
}
