import { memo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from '../components/AuthLayout'

import SigninPage from '../pages/Signin'
import SignupPage from '../pages/Signup'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="signin" element={<SigninPage />} />

        <Route path="signup" element={<SignupPage />} />

        <Route path="*" element={<Navigate to="/auth/signin" />} />
      </Route>
    </Routes>
  )
}

export default memo(AuthRoutes)
