import { Box, Center, Pagination } from '@mantine/core'

import PaymentsHeader from '../PaymentsHeader'
import PaymentsTable from '../PaymentsTable'
import EmptyView from './EmptyView'

import { usePaymentsFiltersStore } from '../../stores/payments-filters'
import { usePaymentsQuery } from '@fe/salaries/hooks/queries/usePaymentsQuery'

const PaymentHistoryMain = () => {
  const { limit = 10, page = 1, search, setPage } = usePaymentsFiltersStore()

  const { data, isLoading } = usePaymentsQuery({
    limit,
    page,
    search,
  })

  return (
    <Box>
      {!isLoading && !search && data?.items.length === 0 ? (
        <EmptyView />
      ) : (
        <>
          <PaymentsHeader />

          <PaymentsTable list={data?.items || []} isLoading={isLoading} />

          <Center py="md">
            <Pagination
              total={Math.ceil((data?.count ?? 0) / (data?.limit ?? limit))}
              value={page}
              onChange={value => setPage(value)}
              onNextPage={() => setPage(page + 1)}
              onPreviousPage={() => setPage(page - 1)}
            />
          </Center>
        </>
      )}
    </Box>
  )
}

export default PaymentHistoryMain
