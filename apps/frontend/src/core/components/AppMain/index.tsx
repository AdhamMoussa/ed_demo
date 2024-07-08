import { memo, PropsWithChildren } from 'react'
import { AppShell, rem } from '@mantine/core'

const AppMain = ({ children }: PropsWithChildren) => {
  return (
    <AppShell.Main
      mt={rem(64)}
      ml={{ base: 0, sm: rem(270) }}
      px={{ base: 'sm', sm: 'xl' }}
      py="lg"
      bg="gray.1"
      mih="100vh"
    >
      {children}
    </AppShell.Main>
  )
}

export default memo(AppMain)
