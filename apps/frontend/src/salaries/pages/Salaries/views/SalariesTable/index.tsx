import { memo } from 'react'

import { Table } from '@mantine/core'

import SalariesTableHead from './SalariesTableHead'
import LoadingSkeleton from './LoadingSkeleton'
import SalariesTableRow from './SalariesTableRow'

import { useCurrentOrg } from '@fe/organizations/hooks/useCurrentOrg'

import { EmployeeOutput } from '@ed-demo/dto'

type SalariesTableProps = {
  list: EmployeeOutput[]
  isLoading?: boolean
}

const SalariesTable = (props: SalariesTableProps) => {
  const { list, isLoading } = props

  const org = useCurrentOrg()

  return (
    <Table.ScrollContainer minWidth={800} bg="white">
      <Table highlightOnHover stickyHeader layout="fixed">
        <Table.Thead>
          <SalariesTableHead />
        </Table.Thead>

        <Table.Tbody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            list.map(employee => (
              <SalariesTableRow
                key={employee.id}
                employee={employee}
                currencySymbol={org?.currency.symbol}
              />
            ))
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default memo(SalariesTable)
