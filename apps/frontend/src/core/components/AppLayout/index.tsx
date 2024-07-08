import { memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AppShell, rem } from '@mantine/core'

import AppLoading from '../AppLoading'
import AppSideMenu from '../AppSideMenu'
import Onboarding from '../Onboarding'

import { useLayoutStore } from '@fe/core/stores/layout'

import { getAuthToken } from '@fe/core/utils/authToken'

function AppLayout() {
  const authToken = getAuthToken()

  const { isMobileSidebarOpen } = useLayoutStore()

  if (!authToken) {
    return (
      <Navigate
        to={`/auth/signin?redirect_url=${window.location.href}`}
        replace
      />
    )
  }

  return (
    <AppLoading>
      <Onboarding>
        <AppShell
          navbar={{
            width: rem('270px'),
            breakpoint: 'sm',
            collapsed: {
              desktop: false,
              mobile: !isMobileSidebarOpen,
            },
          }}
          header={{ height: rem(64), offset: false }}
        >
          <AppSideMenu />

          <Outlet />
        </AppShell>
      </Onboarding>
    </AppLoading>
  )
}

export default memo(AppLayout)
