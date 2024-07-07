import { memo } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import AppLayout from '../components/AppLayout'

import EmployeesRoutes from '@fe/employees/routes/EmployeesRoutes'
import SalariesRoutes from '@fe/salaries/routes/SalariesRoutes'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/employees" replace />} />

        <Route path="employees/*" element={<EmployeesRoutes />} />

        <Route path="salaries/*" element={<SalariesRoutes />} />

        <Route path="*" element={<Navigate to="/employees" replace />} />
      </Route>
    </Routes>
  )
}

export default memo(PrivateRoutes)
