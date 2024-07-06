import { Center, Table, Text } from '@mantine/core'

import EmployeesTableRow from './EmployeesTableRow'
import LoadingSkeleton from './LoadingSkeleton'

import { useMeQuery } from '@fe/auth/hooks/queries/useMeQuery'

import { EmployeesListOutput } from '@ed-demo/dto'

type EmployeesTableProps = {
  list: EmployeesListOutput['items']
  isLoading?: boolean
}

const EmployeesTable = (props: EmployeesTableProps) => {
  const { list, isLoading } = props

  const { data: userData } = useMeQuery()

  const org = userData?.organization

  return (
    <Table.ScrollContainer minWidth={800} bg="white">
      <Table highlightOnHover stickyHeader layout="fixed">
        <Table.Thead>
          <Table.Tr>
            <Table.Th pl="lg">ID</Table.Th>

            <Table.Th>Name</Table.Th>

            <Table.Th>Joining Date</Table.Th>

            <Table.Th>Basic Salary</Table.Th>

            <Table.Th>Allowances</Table.Th>

            <Table.Th pr="lg" />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            list.map(employee => (
              <EmployeesTableRow
                key={employee.id}
                employee={employee}
                currencySymbol={org?.currency.symbol}
              />
            ))
          )}
        </Table.Tbody>
      </Table>

      {list.length === 0 && !isLoading && (
        <Center bg="white" p="lg">
          <Text size="sm" c="gray">
            No employees found, try a different search query
          </Text>
        </Center>
      )}
    </Table.ScrollContainer>
  )
}

export default EmployeesTable
