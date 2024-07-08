import { Table } from '@mantine/core'

import SalariesTableHead from './SalariesTableHead'
import LoadingSkeleton from './LoadingSkeleton'
import SalariesTableRow from './SalariesTableRow'

import { useCurrentOrg } from '@fe/organizations/hooks/useCurrentOrg'
import { useSalariesPaymentStore } from '../../stores/salaries-payment'

import { EmployeeOutput } from '@ed-demo/dto'

type SalariesTableProps = {
  list: EmployeeOutput[]
  isLoading?: boolean
}

const SalariesTable = (props: SalariesTableProps) => {
  const { list, isLoading } = props

  const { payments, setPayment, removePayment } = useSalariesPaymentStore()

  const org = useCurrentOrg()

  return (
    <Table.ScrollContainer minWidth={1400} bg="white">
      <Table highlightOnHover stickyHeader layout="fixed">
        <Table.Thead>
          <SalariesTableHead />
        </Table.Thead>

        <Table.Tbody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            list.map(employee => {
              const payment = payments.find(p => p.employeeId === employee.id)

              return (
                <SalariesTableRow
                  key={employee.id}
                  employee={employee}
                  currencySymbol={org?.currency.symbol}
                  additions={payment?.additions ?? 0}
                  deductions={payment?.deductions ?? 0}
                  isGratuity={payment?.isGratuity ?? false}
                  month={payment?.month ?? null}
                  onPaymentChange={setPayment}
                  onPaymentRemove={removePayment}
                />
              )
            })
          )}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}

export default SalariesTable
