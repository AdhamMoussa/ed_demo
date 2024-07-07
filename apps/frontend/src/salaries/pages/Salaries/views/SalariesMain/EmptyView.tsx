import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Button, Center, rem, Stack, Text } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'

const EmptyView = () => {
  return (
    <Center bg="white" mih={rem(400)}>
      <Stack align="center">
        <Text fw="bold" c="gray">
          No Employees Added Yet
        </Text>

        <Button leftSection={<TbPlus />} component={Link} to="/employees">
          Add Your First Employee
        </Button>
      </Stack>
    </Center>
  )
}

export default memo(EmptyView)
