import { Table } from '@mantine/core'

import PaymentsTableHead from './PaymentsTableHead'
import LoadingSkeleton from './LoadingSkeleton'
import PaymentsTableRow from './PaymentsTableRow'

import { useCurrentOrg } from '@fe/organizations/hooks/useCurrentOrg'

import { PaymentOutput } from '@ed-demo/dto'

type PaymentsTableProps = {
  list: PaymentOutput[]
  isLoading?: boolean
}

const PaymentsTable = (props: PaymentsTableProps) => {
  const { list, isLoading } = props

  const org = useCurrentOrg()

  return (
    <Table.ScrollContainer minWidth={1400} bg="white">
      <Table highlightOnHover stickyHeader layout="fixed">
        <Table.Thead>
          <PaymentsTableHead />
        </Table.Thead>

        <Table.Tbody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            list.map(payment => {
              return (
                <PaymentsTableRow
                  key={payment.id}
                  payment={payment}
                  currencySymbol={org?.currency.symbol}
                />
              )
            })
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default PaymentsTable
