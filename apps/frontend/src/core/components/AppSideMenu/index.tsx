import { memo } from 'react'
import { NavLink as Link } from 'react-router-dom'
import clsx from 'clsx'

import {
  AppShell,
  Box,
  Button,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core'

import {
  TbBrandReact,
  TbChevronLeft,
  TbReportMoney,
  TbUsersGroup,
} from 'react-icons/tb'

import { useLayoutStore } from '@fe/core/stores/layout'

import classes from './styles.module.css'

const items = [
  {
    label: 'Employees',
    icon: <TbUsersGroup size="1.3rem" />,
    to: '/employees',
  },
  {
    label: 'Salaries',
    icon: <TbReportMoney size="1.4rem" />,
    to: '/salaries',
  },
]

const AppSideMenu = () => {
  const toggleMenu = useLayoutStore(state => state.toggleMobileSidebar)

  return (
    <AppShell.Navbar withBorder={false} bg="dark.7">
      <Box px={rem('20px')} py={rem('15px')}>
        <Box component={Link} to="/app/dashboard" td="none">
          <Group c="white">
            <TbBrandReact size={32} />

            <Title order={4} lh="1">
              Ed Payroll Portal
            </Title>
          </Group>
        </Box>
      </Box>

      <Divider color="dark.4" />

      <Stack className={classes.navList}>
        {items.map(item => (
          <Link
            key={item.to}
            to={item.to}
            style={{ textDecoration: 'none' }}
            onClick={toggleMenu}
          >
            {({ isActive }) => (
              <Group
                gap={0}
                className={clsx(classes.navLink, {
                  [classes.activeNavLink]: isActive,
                })}
              >
                <Box lh={0} w={rem('40px')}>
                  {item.icon}
                </Box>

                <Text size="sm" fw={isActive ? 'bold' : 'normal'}>
                  {item.label}
                </Text>
              </Group>
            )}
          </Link>
        ))}
      </Stack>

      <Button
        leftSection={<TbChevronLeft />}
        variant="light"
        hiddenFrom="sm"
        fullWidth
        onClick={toggleMenu}
      >
        Close Menu
      </Button>
    </AppShell.Navbar>
  )
}

export default memo(AppSideMenu)
