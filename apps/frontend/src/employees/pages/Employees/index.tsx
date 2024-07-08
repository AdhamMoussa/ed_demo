import { Helmet } from 'react-helmet'

import EmployeesMain from './views/EmployeesMain'
import Modals from './views/Modals'
import AppHeader from '@fe/core/components/AppHeader'
import AppMain from '@fe/core/components/AppMain'

const EmployeesPage = () => {
  return (
    <>
      <Helmet>
        <title>Employees | Ed Payroll Portal</title>
      </Helmet>

      <AppHeader title="Employees" />

      <AppMain>
        <EmployeesMain />
      </AppMain>

      <Modals />
    </>
  )
}

export default EmployeesPage
