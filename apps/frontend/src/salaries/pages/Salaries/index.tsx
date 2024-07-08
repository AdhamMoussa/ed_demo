import { memo } from 'react'
import { Helmet } from 'react-helmet'

import SalariesMain from './views/SalariesMain'
import AppHeader from '@fe/core/components/AppHeader'
import AppMain from '@fe/core/components/AppMain'

const SalariesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Salaries | Ed Payroll Portal</title>
      </Helmet>

      <AppHeader title="Salaries" />

      <AppMain>
        <SalariesMain />
      </AppMain>
    </>
  )
}

export default memo(SalariesPage)
