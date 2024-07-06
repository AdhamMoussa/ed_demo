import { Helmet } from 'react-helmet'

import EmployeesMain from './views/EmployeesMain'
import Modals from './views/Modals'

const EmployeesPage = () => {
  return (
    <>
      <Helmet>
        <title>Employees | Ed Payroll Portal</title>
      </Helmet>

      <EmployeesMain />

      <Modals />
    </>
  )
}

export default EmployeesPage
