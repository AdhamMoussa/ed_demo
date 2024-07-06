import { Route, Routes } from 'react-router-dom'

import EmployeesPage from '../pages/Employees'

const EmployeesRoutes = () => {
  return (
    <Routes>
      <Route index element={<EmployeesPage />} />
    </Routes>
  )
}

export default EmployeesRoutes
