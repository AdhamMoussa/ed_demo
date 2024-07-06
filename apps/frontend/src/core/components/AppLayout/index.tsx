import { memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { AppShell, Box, rem } from '@mantine/core'

import AppLoading from '../AppLoading'
import AppSideMenu from '../AppSideMenu'

import { getAuthToken } from '@fe/core/utils/authToken'

function AppLayout() {
  const authToken = getAuthToken()

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
      <AppShell
        navbar={{ width: rem('270px'), breakpoint: 'sm' }}
        header={{ height: rem(64), offset: false }}
      >
        <AppSideMenu />
      </AppShell>

      <Box ml={rem('270px')} px="xl" py="lg" bg="gray.1" mih="100vh">
        <Outlet />
      </Box>
    </AppLoading>
  )
}

export default memo(AppLayout)
