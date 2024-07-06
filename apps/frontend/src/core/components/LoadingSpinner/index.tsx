import { memo } from 'react'
import { Center, Loader, Overlay, Stack, Text } from '@mantine/core'

const LoadingSpinner = () => {
  return (
    <Overlay bg="white">
      <Center h="100%">
        <Stack align="center">
          <Loader size="xl" />

          <Text mt="md" size="xl">
            Loading...
          </Text>
        </Stack>
      </Center>
    </Overlay>
  )
}

export default memo(LoadingSpinner)
