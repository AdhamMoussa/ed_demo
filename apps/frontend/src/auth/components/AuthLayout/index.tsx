import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div>
      <div>AuthLayout</div>

      <Outlet />
    </div>
  )
}

export default AuthLayout
