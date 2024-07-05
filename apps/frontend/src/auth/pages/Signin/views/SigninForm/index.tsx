import { memo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Alert,
  Button,
  Loader,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'

import { TbExclamationCircle } from 'react-icons/tb'

import { useSigninMutation } from '@fe/auth/hooks/mutations/useSigninMutation'

import { ErrorOutput, SigninInput, signinInputSchema } from '@ed-demo/dto'

const SigninForm = () => {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SigninInput>({
    mode: 'onTouched',
    resolver: zodResolver(signinInputSchema),
  })

  const { mutate: signin, isPending, error } = useSigninMutation()

  const submitHandler = (data: SigninInput) => {
    signin(data, {
      onError: err => {
        const data = err.json as ErrorOutput

        if (data.fields)
          Object.entries(data.fields).forEach(([key, value]) => {
            if (value)
              setError(key as keyof SigninInput, {
                type: 'manual',
                message: value[0],
              })
          })
      },
    })
  }

  const redirectUrl = searchParams.get('redirect_url')
  const signupUrl = `/auth/signup${
    redirectUrl ? `?redirect_url=${redirectUrl}` : ''
  }`

  return (
    <Stack onSubmit={handleSubmit(submitHandler)} component="form">
      {error?.json.message && !isPending ? (
        <Alert
          color="red"
          title={error.json.message}
          icon={<TbExclamationCircle />}
        />
      ) : null}

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

      <Button
        type="submit"
        disabled={isPending}
        rightSection={isPending ? <Loader size="xs" color="dark" /> : null}
      >
        Sign In
      </Button>

      <Button
        component={Link}
        to={signupUrl}
        variant="subtle"
        size="compact-sm"
        w="fit-content"
        mx="auto"
      >
        Sign Up
      </Button>
    </Stack>
  )
}

export default memo(SigninForm)
