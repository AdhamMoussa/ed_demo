import { Box, Center, Pagination, Title } from '@mantine/core'

import EmployeesHeader from '../EmployeesHeader'
import EmployeesTable from '../EmployeesTable'
import EmptyView from '../EmployeesTable/EmptyView'

import { useEmployeesFiltersStore } from '@fe/employees/stores/employees-filters'
import { useEmployeesListQuery } from '@fe/employees/hooks/queries/useEmployeesListQuery'
import { useDebouncedValue } from '@mantine/hooks'

const EmployeesMain = () => {
  const { limit = 10, page = 1, search, setPage } = useEmployeesFiltersStore()

  const [debouncedSearch] = useDebouncedValue(search, 500)

  const { data, isLoading } = useEmployeesListQuery({
    limit,
    page,
    search: debouncedSearch,
  })

  return (
    <Box>
      <Title order={2} mb="xl">
        Employees
      </Title>

      {!isLoading && !search && data?.items.length === 0 ? (
        <EmptyView />
      ) : (
        <>
          <EmployeesHeader />

          <EmployeesTable list={data?.items || []} isLoading={isLoading} />

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

export default EmployeesMain
