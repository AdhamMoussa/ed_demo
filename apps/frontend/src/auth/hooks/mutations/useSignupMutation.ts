import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { WretchError } from 'wretch'

import { signup } from '@fe/auth/api/auth'

import { SignupInput, SuccessOutput } from '@ed-demo/dto'

export const useSignupMutation = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mutation = useMutation<SuccessOutput, WretchError, SignupInput>({
    mutationFn: signup,

    onSuccess: () => {
      navigate(
        `/auth/signin${
          searchParams.get('redirect_url')
            ? `?redirect_url=${searchParams.get('redirect_url')}`
            : ''
        }`,
      )
    },
  })

  return mutation
}
