import { memo, useMemo } from 'react'
import numeral from 'numeral'
import dayjs from 'dayjs'

import { ActionIcon, Group, rem, Table, Tooltip } from '@mantine/core'
import { TbArchive, TbEdit } from 'react-icons/tb'

import { EmployeeOutput } from '@ed-demo/dto'

type EmployeesTableRowProps = {
  employee: EmployeeOutput
  currencySymbol?: string
  onEdit: (employee: EmployeeOutput) => void
}

const EmployeesTableRow = (props: EmployeesTableRowProps) => {
  const { employee, currencySymbol, onEdit } = props

  const totalAllowances = useMemo(
    () => employee.allowances.reduce((total, item) => total + item.amount, 0),
    [employee.allowances],
  )

  return (
    <Table.Tr>
      <Table.Td pl="lg">{employee.staffId}</Table.Td>

      <Table.Td>
        {employee.firstName} {employee.lastName}
      </Table.Td>

      <Table.Td>{dayjs(employee.joinedAt).format('DD MMM YYYY')}</Table.Td>

      <Table.Td>
        {numeral(employee.basicSalary).format(`${currencySymbol}0,0.[00]`)}
      </Table.Td>

      <Table.Td>
        {numeral(totalAllowances).format(`${currencySymbol}0,0.[00]`)}
      </Table.Td>

      <Table.Td pr="lg" w={rem(110)}>
        <Group justify="flex-end">
          <Tooltip label="Edit">
            <ActionIcon variant="subtle" onClick={() => onEdit(employee)}>
              <TbEdit />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Archive">
            <ActionIcon variant="subtle">
              <TbArchive />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  )
}

export default memo(EmployeesTableRow)
