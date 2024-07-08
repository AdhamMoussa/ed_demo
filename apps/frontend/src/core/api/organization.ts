import { api } from '../utils/api'

import { CreateOrgInput, SuccessOutput } from '@ed-demo/dto'

export const createOrganization = async (dto: CreateOrgInput) => {
  return api.url('/v1/organizations').post(dto).json<SuccessOutput>()
}
