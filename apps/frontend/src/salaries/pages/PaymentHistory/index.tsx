import { memo } from 'react'
import { Helmet } from 'react-helmet'

import AppHeader from '@fe/core/components/AppHeader'
import AppMain from '@fe/core/components/AppMain'
import PaymentHistoryMain from './views/PaymentHistoryMain'

const PaymentHistoryPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Payment History | Ed Payroll Portal</title>
      </Helmet>

      <AppHeader title="Payments History" />

      <AppMain>
        <PaymentHistoryMain />
      </AppMain>
    </>
  )
}

export default memo(PaymentHistoryPage)
