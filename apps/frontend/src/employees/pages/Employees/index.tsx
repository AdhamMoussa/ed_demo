import { Helmet } from 'react-helmet'

import EmployeesMain from './views/EmployeesMain'

const EmployeesPage = () => {
  return (
    <>
      <Helmet>
        <title>Employees | Ed Payroll Portal</title>
      </Helmet>

      <EmployeesMain />
    </>
  )
}

export default EmployeesPage
