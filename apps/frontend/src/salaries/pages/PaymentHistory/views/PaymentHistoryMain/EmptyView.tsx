import { memo } from 'react'

import { Center, rem, Stack, Text } from '@mantine/core'

const EmptyView = () => {
  return (
    <Center bg="white" mih={rem(400)}>
      <Stack align="center">
        <Text fw="bold" c="gray">
          No Payments Done Yet
        </Text>
      </Stack>
    </Center>
  )
}

export default memo(EmptyView)
