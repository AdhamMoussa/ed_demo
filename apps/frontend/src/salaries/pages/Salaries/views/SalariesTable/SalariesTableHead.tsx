import { memo } from 'react'

import { rem, Table } from '@mantine/core'

const SalariesTableHead = () => {
  return (
    <Table.Tr>
      <Table.Th pl="lg">ID</Table.Th>

      <Table.Th>Name</Table.Th>

      <Table.Th>Joining Date</Table.Th>

      <Table.Th>Basic Salary</Table.Th>

      <Table.Th>Allowances</Table.Th>

      <Table.Th>Month</Table.Th>

      <Table.Th>Additions</Table.Th>

      <Table.Th>Deductions</Table.Th>

      <Table.Th>Total</Table.Th>

      <Table.Th>Gratuity</Table.Th>

      <Table.Th w={rem(44)} p={0} />
    </Table.Tr>
  )
}

export default memo(SalariesTableHead)
