import { memo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import AppLayout from '../components/AppLayout'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/employees" replace />} />

        <Route path="employees/*" element={<div>employees</div>} />

        <Route path="salaries/*" element={<div>salaries</div>} />

        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Route>
    </Routes>
  )
}

export default memo(PrivateRoutes)
