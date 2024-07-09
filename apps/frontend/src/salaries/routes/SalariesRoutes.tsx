import { memo } from 'react'
import { Route, Routes } from 'react-router-dom'

import SalariesPage from '../pages/Salaries'
import PaymentHistoryPage from '../pages/PaymentHistory'

const SalariesRoutes = () => {
  return (
    <Routes>
      <Route index element={<SalariesPage />} />

      <Route path="payments" element={<PaymentHistoryPage />} />
    </Routes>
  )
}

export default memo(SalariesRoutes)
