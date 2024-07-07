import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import SalariesPage from '../pages/Salaries'

const SalariesRoutes = () => {
  return (
    <Routes>
      <Route index element={<SalariesPage />} />
    </Routes>
  )
}

export default memo(SalariesRoutes)
