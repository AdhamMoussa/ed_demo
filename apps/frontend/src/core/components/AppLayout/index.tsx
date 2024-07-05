import { Navigate, Outlet } from 'react-router-dom'

import { getAuthToken } from '@fe/core/utils/authToken'

function AppLayout() {
  const authToken = getAuthToken()

  if (!authToken) {
    return (
      <Navigate
        to={`/auth/signin?redirect_url=${window.location.href}`}
        replace
      />
    )
  }

  return (
    <div>
      <div>AppLayout</div>

      <Outlet />
    </div>
  )
}

export default AppLayout
