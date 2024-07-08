import { memo, PropsWithChildren } from 'react'

import CreateProfile from './CreateProfile'
import CreateOrg from './CreateOrg'

import { useMeQuery } from '@fe/auth/hooks/queries/useMeQuery'

const Onboarding = (props: PropsWithChildren) => {
  const { children } = props

  const { data: userData } = useMeQuery()

  if (!userData?.profile) {
    return <CreateProfile />
  }

  if (!userData.organization) {
    return <CreateOrg />
  }

  return children
}

export default memo(Onboarding)
