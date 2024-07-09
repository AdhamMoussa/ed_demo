import { memo } from 'react'

import AddEmployeeModal from './AddEmployeeModal'
import EditEmployeeModal from './EditEmployeeModal'
import ArchiveEmployeeModal from './ArchiveEmployeeModal'

import { useEmployeesModalsStore } from '../../stores/employees-modals'

const EmployeesModals = () => {
  const { addEmployee, editEmployee, archiveEmployee } =
    useEmployeesModalsStore()

  return (
    <>
      {addEmployee.isOpen && <AddEmployeeModal onClose={addEmployee.close} />}

      {editEmployee.isOpen && (
        <EditEmployeeModal
          employee={editEmployee.employee}
          onClose={editEmployee.close}
        />
      )}

      {archiveEmployee.isOpen && (
        <ArchiveEmployeeModal
          employee={archiveEmployee.employee}
          onClose={archiveEmployee.close}
        />
      )}
    </>
  )
}

export default memo(EmployeesModals)
