import { memo } from 'react'
import { Helmet } from 'react-helmet'

import { Card, Center, Group, Title, rem } from '@mantine/core'

import SigninForm from './views/SigninForm'

const SigninPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign in | Ed Payroll Portal</title>
      </Helmet>

      <Center mih="100vh">
        <Card withBorder shadow="lg" p="xl" w={rem(450)} maw="100%">
          <Group mb="xl" justify="center">
            <Title ta="center" order={3}>
              Ed Payroll Portal
            </Title>
          </Group>

          <SigninForm />
        </Card>
      </Center>
    </>
  )
}

export default memo(SigninPage)
