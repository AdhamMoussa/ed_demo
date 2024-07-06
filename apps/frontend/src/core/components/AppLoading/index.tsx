import { memo, PropsWithChildren } from 'react'

import LoadingSpinner from '../LoadingSpinner'

import { useMeQuery } from '@fe/auth/hooks/queries/useMeQuery'

const AppLoading = (props: PropsWithChildren) => {
  const { children } = props

  const { data: userData, isLoading } = useMeQuery()

  if (isLoading || !userData) {
    return <LoadingSpinner />
  }

  return children
}

export default memo(AppLoading)
