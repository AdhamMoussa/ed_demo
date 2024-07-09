import { memo } from 'react'

import { Table } from '@mantine/core'

const PaymentsTableHead = () => {
  return (
    <Table.Tr>
      <Table.Th>Name</Table.Th>

      <Table.Th>Month</Table.Th>

      <Table.Th>Payment Date</Table.Th>

      <Table.Th>Basic Salary</Table.Th>

      <Table.Th>Allowances</Table.Th>

      <Table.Th>Additions</Table.Th>

      <Table.Th>Deductions</Table.Th>

      <Table.Th>Total</Table.Th>

      <Table.Th align="center" ta="center">
        Gratuity
      </Table.Th>
    </Table.Tr>
  )
}

export default memo(PaymentsTableHead)
