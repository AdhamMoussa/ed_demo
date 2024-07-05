import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from './PrivateRoutes'
import AuthRoutes from '@fe/auth/routes/AuthRoutes'

const RootRoute = () => {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthRoutes />} />

      <Route path="/*" element={<PrivateRoutes />} />
    </Routes>
  )
}

export default RootRoute
