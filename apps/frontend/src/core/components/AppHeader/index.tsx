import { memo } from 'react'

import { AppShell, Burger, Flex, Group, rem, Title } from '@mantine/core'

import UserDropdown from '@fe/auth/components/UserDropdown'

import { useLayoutStore } from '@fe/core/stores/layout'

const AppHeader = ({ title }: { title: string }) => {
  const { isMobileSidebarOpen, toggleMobileSidebar } = useLayoutStore()

  return (
    <AppShell.Header left={{ sm: rem(270) }}>
      <Flex justify="space-between" py="md" px={{ base: 'sm', sm: 'xl' }}>
        <Group>
          <Burger
            opened={isMobileSidebarOpen}
            onClick={toggleMobileSidebar}
            hiddenFrom="sm"
            size="sm"
          />

          <Title order={3}>{title}</Title>
        </Group>

        <UserDropdown />
      </Flex>
    </AppShell.Header>
  )
}

export default memo(AppHeader)
