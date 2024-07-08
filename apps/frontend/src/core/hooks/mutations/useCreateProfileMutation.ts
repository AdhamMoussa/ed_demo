import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WretchError } from 'wretch'

import { createProfile } from '@fe/core/api/profile'

import { ME_QUERY_KEY } from '@fe/auth/hooks/queries/useMeQuery'

import { CreateProfileInput, SuccessOutput } from '@ed-demo/dto'

export const useCreateProfileMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<SuccessOutput, WretchError, CreateProfileInput>({
    mutationFn: createProfile,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] })
    },
  })

  return mutation
}
