import { memo } from 'react'
import { useDebouncedCallback } from '@mantine/hooks'

import { Flex, Input } from '@mantine/core'

import { usePaymentsFiltersStore } from '@fe/salaries/pages/PaymentHistory/stores/payments-filters'

const PaymentsHeader = () => {
  const _setSearch = usePaymentsFiltersStore(state => state.setSearch)

  const setSearch = useDebouncedCallback(_setSearch, 300)

  return (
    <Flex justify="space-between">
      <Input
        placeholder="Search employees..."
        mb="sm"
        w="50%"
        onChange={e => setSearch(e.target.value)}
      />
    </Flex>
  )
}

export default memo(PaymentsHeader)
