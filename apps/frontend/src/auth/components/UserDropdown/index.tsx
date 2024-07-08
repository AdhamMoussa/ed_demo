import { memo } from 'react'

import {
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { TbChevronRight, TbLogout, TbSettings, TbUser } from 'react-icons/tb'

import { useMeQuery } from '@fe/auth/hooks/queries/useMeQuery'

import { signout } from '@fe/auth/api/auth'

const UserDropdown = () => {
  const { data: userData } = useMeQuery()

  return (
    <Menu width={rem('250px')} position={'bottom'}>
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Avatar src={''} radius="xl">
              {userData?.profile?.firstName[0]}
            </Avatar>

            <Box style={{ flex: 1 }} visibleFrom="sm">
              <Text size="sm" fw={500} w="150px" truncate>
                {userData?.profile?.firstName} {userData?.profile?.lastName}
              </Text>

              <Text size="xs" w="150px" truncate>
                {userData?.email}
              </Text>
            </Box>

            <Box lh={0} visibleFrom="sm">
              <TbChevronRight size={18} />
            </Box>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<TbUser size="1.2rem" />}>Profile</Menu.Item>

        <Menu.Item leftSection={<TbSettings size="1.2rem" />}>
          Account Settings
        </Menu.Item>

        <Menu.Item leftSection={<TbLogout size="1.2rem" />} onClick={signout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default memo(UserDropdown)
