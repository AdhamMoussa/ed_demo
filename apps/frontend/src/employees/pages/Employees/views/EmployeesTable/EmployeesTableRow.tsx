import { memo, useMemo } from 'react'
import numeral from 'numeral'
import dayjs from 'dayjs'

import { ActionIcon, Group, rem, Table, Tooltip } from '@mantine/core'

import { EmployeesListOutput } from '@ed-demo/dto'
import { TbArchive, TbEdit } from 'react-icons/tb'

type EmployeesTableRowProps = {
  employee: EmployeesListOutput['items'][0]
  currencySymbol?: string
}

const EmployeesTableRow = (props: EmployeesTableRowProps) => {
  const { employee, currencySymbol } = props

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
            <ActionIcon variant="subtle">
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
