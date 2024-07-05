import wretch, { ConfiguredMiddleware } from 'wretch'
import queryStringAddon from 'wretch/addons/queryString'

import { getAuthToken, removeAuthToken } from './authToken'

const prefixUrl = import.meta.env.VITE_API_URL

const authMiddleware: ConfiguredMiddleware = next => async (url, opts) => {
  const accessToken = getAuthToken()

  opts.headers = {
    ...opts.headers,
    ...(accessToken ? { Authorization: accessToken } : {}),
  }

  return next(url, opts)
}

const authCatcher = () => {
  if (window.location.pathname === '/auth/signin') return

  removeAuthToken()
  window.location.href = '/auth/signin'
}

const api = wretch(prefixUrl)
  .addon(queryStringAddon)
  .middlewares([authMiddleware])
  .catcher(401, authCatcher)

export { api }
