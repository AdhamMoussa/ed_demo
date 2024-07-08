import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Group, Stack, TextInput } from '@mantine/core'

import { CreateProfileInput, createProfileInputSchema } from '@ed-demo/dto'

type ProfileFormProps = {
  isLoading?: boolean
  onSubmit: (data: CreateProfileInput) => void
}

const ProfileForm = (props: ProfileFormProps) => {
  const { isLoading, onSubmit } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProfileInput>({
    mode: 'onTouched',
    resolver: zodResolver(createProfileInputSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack>
        <Group align="flex-start">
          <TextInput
            {...register('firstName')}
            placeholder="First name..."
            label="First name"
            error={errors.firstName?.message}
            flex={1}
            disabled={isLoading}
            required
          />

          <TextInput
            {...register('lastName')}
            placeholder="Last name..."
            label="Last name"
            error={errors.lastName?.message}
            flex={1}
            disabled={isLoading}
            required
          />
        </Group>

        <Button type="submit">Create Profile</Button>
      </Stack>
    </form>
  )
}

export default memo(ProfileForm)
