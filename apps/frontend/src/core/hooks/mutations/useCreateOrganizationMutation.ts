import { useMutation, useQueryClient } from '@tanstack/react-query'
import { WretchError } from 'wretch'

import { createOrganization } from '@fe/core/api/organization'

import { ME_QUERY_KEY } from '@fe/auth/hooks/queries/useMeQuery'

import { CreateOrgInput, SuccessOutput } from '@ed-demo/dto'

export const useCreateOrganizationMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<SuccessOutput, WretchError, CreateOrgInput>({
    mutationFn: createOrganization,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] })
    },
  })

  return mutation
}
