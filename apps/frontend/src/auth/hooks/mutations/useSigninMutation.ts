import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { WretchError } from 'wretch'

import { signin } from '@fe/auth/api/auth'
import { setAuthToken } from '@fe/core/utils/authToken'

import { SigninInput } from '@ed-demo/dto'

export const useSigninMutation = () => {
  const [searchParams] = useSearchParams()

  const mutation = useMutation<{ token: string }, WretchError, SigninInput>({
    mutationFn: signin,

    onSuccess: ({ token }) => {
      setAuthToken(token)

      window.location.href = searchParams.get('redirect_url') || '/employees'
    },
  })

  return mutation
}
