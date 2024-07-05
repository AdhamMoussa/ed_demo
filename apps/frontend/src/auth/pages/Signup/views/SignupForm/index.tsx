import { memo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Loader, PasswordInput, Stack, TextInput } from '@mantine/core'

import { useSignupMutation } from '@fe/auth/hooks/mutations/useSignupMutation'

import { ErrorOutput, SignupInput, signupInputSchema } from '@ed-demo/dto'

const SignupForm = () => {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupInput>({
    mode: 'onTouched',
    resolver: zodResolver(signupInputSchema),
  })

  const { mutate: signup, isPending } = useSignupMutation()

  const submitHandler = (data: SignupInput) => {
    signup(data, {
      onError: err => {
        const data = err.json as ErrorOutput

        if (data.fields)
          Object.entries(data.fields).forEach(([key, value]) => {
            if (value)
              setError(key as keyof SignupInput, {
                type: 'manual',
                message: value[0],
              })
          })
      },
    })
  }

  const redirectUrl = searchParams.get('redirect_url') || '/employees'
  const signinUrl = `/auth/signin${
    redirectUrl ? `?redirect_url=${redirectUrl}` : ''
  }`

  return (
    <Stack onSubmit={handleSubmit(submitHandler)} gap="xs" component="form">
      <TextInput
        {...register('email')}
        placeholder="Email"
        label="Email"
        error={errors.email?.message}
      />

      <PasswordInput
        {...register('password')}
        placeholder="Password"
        label="Password"
        error={errors.password?.message}
      />

      <PasswordInput
        {...register('passwordConfirmation')}
        placeholder="Confirm Password"
        label="Confirm Password"
        error={errors.passwordConfirmation?.message}
      />

      <Button
        type="submit"
        disabled={isPending}
        rightSection={isPending ? <Loader size="xs" color="dark" /> : null}
      >
        Sign Up
      </Button>

      <Button
        component={Link}
        to={signinUrl}
        variant="subtle"
        size="compact-sm"
        w="fit-content"
        mx="auto"
      >
        Sign In
      </Button>
    </Stack>
  )
}

export default memo(SignupForm)
