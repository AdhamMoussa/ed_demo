import { memo, useMemo } from 'react'
import dayjs from 'dayjs'

import { Badge, Table, ThemeIcon } from '@mantine/core'
import { TbMinus, TbSquareCheck } from 'react-icons/tb'

import FormattedCurrency from '@fe/core/components/FormattedCurrency'

import { PaymentOutput } from '@ed-demo/dto'

type PaymentsTableRowProps = {
  payment: PaymentOutput
  currencySymbol?: string
}

const PaymentsTableRow = (props: PaymentsTableRowProps) => {
  const { payment, currencySymbol } = props

  const {
    emplyeeName,
    basicSalary,
    allowances,
    additions,
    deductions,
    month,
    isGratuity,
    paymentDate,
  } = payment

  const totalPaymentAmount = useMemo(
    () => basicSalary + allowances + additions - deductions,
    [basicSalary, allowances, additions, deductions],
  )

  return (
    <Table.Tr>
      <Table.Td pl="lg">{emplyeeName}</Table.Td>

      <Table.Td>{dayjs(month).format('MMM YYYY')}</Table.Td>

      <Table.Td>{dayjs(paymentDate).format('DD MMM YYYY')}</Table.Td>

      <Table.Td>
        <FormattedCurrency
          value={basicSalary}
          currencySymbol={currencySymbol}
        />
      </Table.Td>

      <Table.Td>
        <FormattedCurrency value={allowances} currencySymbol={currencySymbol} />
      </Table.Td>

      <Table.Td>
        <FormattedCurrency value={additions} currencySymbol={currencySymbol} />
      </Table.Td>

      <Table.Td>
        <FormattedCurrency value={deductions} currencySymbol={currencySymbol} />
      </Table.Td>

      <Table.Td>
        <Badge color="orange" size="lg" variant="light">
          <FormattedCurrency
            value={totalPaymentAmount}
            currencySymbol={currencySymbol}
          />
        </Badge>
      </Table.Td>

      <Table.Td align="center">
        {isGratuity ? (
          <ThemeIcon c="green" variant="transparent">
            <TbSquareCheck size={22} />
          </ThemeIcon>
        ) : (
          <TbMinus />
        )}
      </Table.Td>
    </Table.Tr>
  )
}

export default memo(PaymentsTableRow)
