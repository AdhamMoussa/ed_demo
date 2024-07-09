import { memo, PropsWithChildren } from 'react'
import { AppShell, rem } from '@mantine/core'

const AppMain = ({ children }: PropsWithChildren) => {
  return (
    <AppShell.Main
      ml={{ base: 0, sm: rem(270) }}
      px={{ base: 'sm', sm: 'xl' }}
      pb="lg"
      pt={`calc(var(--mantine-spacing-lg) + ${rem(64)})`}
      bg="gray.1"
      mih="100vh"
    >
      {children}
    </AppShell.Main>
  )
}

export default memo(AppMain)
