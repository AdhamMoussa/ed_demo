import { SigninInput, SignupInput, SuccessOutput } from '@ed-demo/dto'

import { api } from '@fe/core/utils/api'
import { removeAuthToken } from '@fe/core/utils/authToken'

export const signin = (dto: SigninInput) => {
  return api.url('/v1/auth/signin').post(dto).json<{ token: string }>()
}

export const signup = (dto: SignupInput) => {
  return api.url('/v1/auth/signup').post(dto).json<SuccessOutput>()
}

export const signout = () => {
  api.url('/v1/auth/sign_out').delete()
  removeAuthToken()
  window.location.href = '/auth/signin'
}
