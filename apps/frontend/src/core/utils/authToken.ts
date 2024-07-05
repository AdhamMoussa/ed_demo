import Cookies from 'js-cookie'

const AUTH_TOKEN_KEY = 'ed_demo_atk'

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY)
}

export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { path: '/' })
}

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY, { path: '/' })
}
