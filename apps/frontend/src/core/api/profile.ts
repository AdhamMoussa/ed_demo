import { api } from '../utils/api'

import { CreateProfileInput, SuccessOutput } from '@ed-demo/dto'

export const createProfile = async (dto: CreateProfileInput) => {
  return api.url('/v1/users/profile').post(dto).json<SuccessOutput>()
}
