import { memo, useMemo } from 'react'
import dayjs from 'dayjs'

import {
  ActionIcon,
  Badge,
  Checkbox,
  NumberInput,
  rem,
  Table,
} from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { TbMinus, TbX } from 'react-icons/tb'

import FormattedCurrency from '@fe/core/components/FormattedCurrency'

import { EmployeeOutput, CreateSalaryPaymentInput } from '@ed-demo/dto'

type SalariesTableRowProps = {
  employee: EmployeeOutput
  currencySymbol?: string
  additions: number
  deductions: number
  isGratuity: boolean
  month: string | null
  onPaymentChange: (
    employee: EmployeeOutput,
    payment: Partial<CreateSalaryPaymentInput>,
  ) => void
  onPaymentRemove: (employee: EmployeeOutput) => void
}

const SalariesTableRow = (props: SalariesTableRowProps) => {
  const {
    employee,
    currencySymbol,
    additions,
    deductions,
    isGratuity,
    month,
    onPaymentChange,
    onPaymentRemove,
  } = props

  const totalAllowances = useMemo(
    () => employee.allowances.reduce((total, item) => total + item.amount, 0),
    [employee.allowances],
  )

  const totalPaymentAmount = useMemo(
    () => employee.basicSalary + totalAllowances + additions - deductions,
    [employee.basicSalary, totalAllowances, additions, deductions],
  )

  const isValid = !!month

  return (
    <Table.Tr bg={isValid ? 'green.0' : undefined}>
      <Table.Td pl="lg">{employee.staffId}</Table.Td>

      <Table.Td>
        {employee.firstName} {employee.lastName}
      </Table.Td>

      <Table.Td>{dayjs(employee.joinedAt).format('DD MMM YYYY')}</Table.Td>

      <Table.Td>
        <FormattedCurrency
          value={employee.basicSalary}
          currencySymbol={currencySymbol}
        />
      </Table.Td>

      <Table.Td>
        <FormattedCurrency
          value={totalAllowances}
          currencySymbol={currencySymbol}
        />
      </Table.Td>

      <Table.Td>
        <MonthPickerInput
          value={month ? new Date(month) : null}
          placeholder="Select..."
          w={rem(120)}
          valueFormat="MMM YYYY"
          getMonthControlProps={date => {
            const isBeforeJoinDate = dayjs(date).isBefore(
              employee.joinedAt,
              'month',
            )
            const isInFuture = dayjs(date).isAfter(dayjs(), 'month')
            const isPaid = employee.salaryPayments.some(payment =>
              dayjs(payment.month).isSame(date, 'month'),
            )
            return {
              disabled: isBeforeJoinDate || isInFuture || isPaid,
            }
          }}
          onChange={value => {
            if (value) {
              onPaymentChange(employee, { month: value.toISOString() })
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
          w={rem(120)}
          disabled={!month}
          onChange={value =>
            onPaymentChange(employee, { additions: value as number })
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
          w={rem(120)}
          onChange={value =>
            onPaymentChange(employee, { deductions: value as number })
          }
        />
      </Table.Td>

      <Table.Td>
        {isValid ? (
          <Badge color="orange" size="lg" variant="light">
            <FormattedCurrency
              value={totalPaymentAmount}
              currencySymbol={currencySymbol}
            />
          </Badge>
        ) : (
          <TbMinus />
        )}
      </Table.Td>

      <Table.Td>
        <Checkbox
          checked={isGratuity}
          disabled={!month}
          onChange={() => {
            onPaymentChange(employee, { isGratuity: !isGratuity })
          }}
        />
      </Table.Td>

      <Table.Td w={rem(44)} p={0}>
        {isValid ? (
          <ActionIcon
            onClick={() => onPaymentRemove(employee)}
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
