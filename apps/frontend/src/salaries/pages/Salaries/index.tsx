import { memo } from 'react'
import { Helmet } from 'react-helmet'

import SalariesMain from './views/SalariesMain'

const SalariesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Salaries | Ed Payroll Portal</title>
      </Helmet>

      <SalariesMain />
    </>
  )
}

export default memo(SalariesPage)
