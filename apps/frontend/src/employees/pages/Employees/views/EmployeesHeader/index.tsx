import { memo } from 'react'

import { Button, Flex, Input } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'

import { useEmployeesFiltersStore } from '@fe/employees/pages/Employees/stores/employees-filters'
import { useEmployeesModalsStore } from '../../stores/employees-modals'

const EmployeesHeader = () => {
  const setSearch = useEmployeesFiltersStore(state => state.setSearch)
  const { open: openAddEmployeeModal } = useEmployeesModalsStore(
    state => state.addEmployee,
  )

  return (
    <Flex justify="space-between">
      <Input
        placeholder="Search employees..."
        mb="sm"
        w="50%"
        onChange={e => setSearch(e.target.value)}
      />

      <Button size="xs" leftSection={<TbPlus />} onClick={openAddEmployeeModal}>
        Add Employee
      </Button>
    </Flex>
  )
}

export default memo(EmployeesHeader)
