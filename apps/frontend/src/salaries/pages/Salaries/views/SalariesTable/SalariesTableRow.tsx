import { memo, useMemo } from 'react'
import dayjs from 'dayjs'
import numeral from 'numeral'

import { ActionIcon, Badge, NumberInput, rem, Table } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { TbMinus, TbX } from 'react-icons/tb'

import { EmployeeOutput, salaryPaymentSchema } from '@ed-demo/dto'

import { useSalariesPaymentStore } from '../../stores/salaries-payment'

type SalariesTableRowProps = {
  employee: EmployeeOutput
  currencySymbol?: string
}

const SalariesTableRow = (props: SalariesTableRowProps) => {
  const { employee, currencySymbol } = props

  const payment = useSalariesPaymentStore(
    state => state.payments[employee.id] || {},
  )

  const { additions = 0, deductions = 0, month = null } = payment

  const setPayment = useSalariesPaymentStore(state => state.setPayment)
  const removePayment = useSalariesPaymentStore(state => state.removePayment)

  const totalAllowances = useMemo(
    () => employee.allowances.reduce((total, item) => total + item.amount, 0),
    [employee.allowances],
  )

  const totalPaymentAmount = useMemo(
    () => employee.basicSalary + totalAllowances + additions - deductions,
    [employee.basicSalary, totalAllowances, additions, deductions],
  )

  const minDate =
    [...employee.salaryPayments]
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .pop()?.month || employee.joinedAt

  const isValid = salaryPaymentSchema.safeParse(payment).success

  return (
    <Table.Tr bg={isValid ? 'green.0' : undefined}>
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

      <Table.Td>
        <MonthPickerInput
          value={month}
          placeholder="Select..."
          w={rem(120)}
          valueFormat="MMM YYYY"
          minDate={new Date(minDate)}
          maxDate={new Date()}
          onChange={value => {
            if (value) {
              setPayment(employee, { month: value ?? undefined })
            }
          }}
        />
      </Table.Td>

      <Table.Td>
        <NumberInput
          value={additions}
          placeholder="Additions..."
          prefix={currencySymbol}
          thousandSeparator=","
          decimalScale={2}
          disabled={!month}
          onChange={value =>
            setPayment(employee, { additions: value as number })
          }
        />
      </Table.Td>

      <Table.Td>
        <NumberInput
          value={deductions}
          placeholder="Deductions..."
          prefix={currencySymbol}
          thousandSeparator=","
          decimalScale={2}
          disabled={!month}
          onChange={value =>
            setPayment(employee, { deductions: value as number })
          }
        />
      </Table.Td>

      <Table.Td>
        {isValid ? (
          <Badge color="orange" size="lg" variant="light">
            {numeral(totalPaymentAmount).format(`${currencySymbol}0,0.[00]`)}
          </Badge>
        ) : (
          <TbMinus />
        )}
      </Table.Td>

      <Table.Td w={rem(44)} p={0}>
        {isValid ? (
          <ActionIcon
            onClick={() => removePayment(employee)}
            size="sm"
            variant="subtle"
          >
            <TbX />
          </ActionIcon>
        ) : null}
      </Table.Td>
    </Table.Tr>
  )
}

export default memo(SalariesTableRow)
