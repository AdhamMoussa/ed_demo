import { Box, Center, Pagination } from '@mantine/core'

import EmptyView from './EmptyView'
import SalariesTable from '../SalariesTable'
import SalariesHeader from '../SalariesHeader'

import { useDebouncedValue } from '@mantine/hooks'
import { useEmployeesListQuery } from '@fe/employees/hooks/queries/useEmployeesListQuery'
import { useSalariesFiltersStore } from '../../stores/salaries-filters'

const SalariesMain = () => {
  const { limit = 10, page = 1, search, setPage } = useSalariesFiltersStore()

  const [debouncedSearch] = useDebouncedValue(search, 500)

  const { data, isLoading } = useEmployeesListQuery({
    limit,
    page,
    search: debouncedSearch,
  })

  return (
    <Box>
      {!isLoading && !debouncedSearch && data?.items.length === 0 ? (
        <EmptyView />
      ) : (
        <>
          <SalariesHeader />

          <SalariesTable list={data?.items || []} isLoading={isLoading} />

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

export default SalariesMain
