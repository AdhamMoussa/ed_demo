import { memo } from 'react'

import { Button, Flex, Input } from '@mantine/core'
import { TbPlus } from 'react-icons/tb'

import { useEmployeesFiltersStore } from '@fe/employees/stores/employees-filters'

const EmployeesHeader = () => {
  const setSearch = useEmployeesFiltersStore(state => state.setSearch)

  return (
    <Flex justify="space-between">
      <Input
        placeholder="Search employees..."
        mb="sm"
        w="50%"
        onChange={e => setSearch(e.target.value)}
      />

      <Button size="xs" leftSection={<TbPlus />}>
        Add Employee
      </Button>
    </Flex>
  )
}

export default memo(EmployeesHeader)