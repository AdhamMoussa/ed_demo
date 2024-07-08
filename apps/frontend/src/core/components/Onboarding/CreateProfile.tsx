import { memo } from 'react'
import { useCreateProfileMutation } from '@fe/core/hooks/mutations/useCreateProfileMutation'
import { notifications } from '@mantine/notifications'

import { Card, Center, Title } from '@mantine/core'

import ProfileForm from '../ProfileForm'

import { CreateProfileInput } from '@ed-demo/dto'

const CreateProfile = () => {
  const { mutate: createProfile, isPending } = useCreateProfileMutation()

  const submitHandler = (dto: CreateProfileInput) => {
    createProfile(dto, {
      onSuccess: () => {
        notifications.show({
          message: 'Profile created successfully',
          color: 'green',
        })
      },
    })
  }

  return (
    <Center mih="100vh">
      <Card withBorder>
        <Title order={3} mb="lg">
          Let's Know More About You
        </Title>

        <ProfileForm onSubmit={submitHandler} isLoading={isPending} />
      </Card>
    </Center>
  )
}

export default memo(CreateProfile)
