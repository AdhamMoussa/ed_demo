import { Navigate, Outlet } from 'react-router-dom'

import { getAuthToken } from '@fe/core/utils/authToken'

function AuthLayout() {
  const authToken = getAuthToken()

  if (authToken) {
    return <Navigate to="/employees" />
  }

  return <Outlet />
}

export default AuthLayout
