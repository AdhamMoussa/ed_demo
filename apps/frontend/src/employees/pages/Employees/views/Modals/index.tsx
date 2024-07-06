import { memo } from 'react'

import AddEmployeeModal from './AddEmployeeModal'
import EditEmployeeModal from './EditEmployeeModal'

import { useEmployeesModalsStore } from '../../stores/employees-modals'

const EmployeesModals = () => {
  const { addEmployee, editEmployee } = useEmployeesModalsStore()

  return (
    <>
      {addEmployee.isOpen && <AddEmployeeModal onClose={addEmployee.close} />}

      {editEmployee.isOpen && (
        <EditEmployeeModal
          employee={editEmployee.employee}
          onClose={editEmployee.close}
        />
      )}
    </>
  )
}

export default memo(EmployeesModals)
