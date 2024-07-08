import { memo, useCallback } from 'react'
import { modals } from '@mantine/modals'
import numeral from 'numeral'

import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Input,
  Text,
  Title,
} from '@mantine/core'

import { TbCheck, TbRestore } from 'react-icons/tb'

import PaymentsSummaryModal from '../PaymentsSummaryModal'

import { useSalariesPaymentStore } from '../../stores/salaries-payment'
import { useSalariesFiltersStore } from '../../stores/salaries-filters'
import { usePaymentsState } from '../../hooks/usePaymentsState'
import { useCurrentOrg } from '@fe/organizations/hooks/useCurrentOrg'

const SalariesHeader = () => {
  const clear = useSalariesPaymentStore(state => state.clear)
  const setSearch = useSalariesFiltersStore(state => state.setSearch)

  const { validPaymentsCount, totalPaymentsAmount } = usePaymentsState()

  const org = useCurrentOrg()

  const openResetModal = useCallback(() => {
    modals.openConfirmModal({
      title: 'Reset Payroll Progress?',
      children: (
        <Text size="sm">
          Are you sure you want to reset the payroll progress? This action
          cannot be undone.
        </Text>
      ),
      labels: { confirm: 'Reset', cancel: 'Cancel' },
      onConfirm: clear,
    })
  }, [clear])

  return (
    <Box>
      <Flex
        justify="space-between"
        align="flex-start"
        mb="lg"
        bg="white"
        p="md"
      >
        <Box>
          <Title order={4} mb="sm">
            Payment Details
          </Title>

          <Group>
            <Title order={6}>Employees:</Title>
            <Text>{validPaymentsCount}</Text>
          </Group>

          <Group>
            <Title order={6}>Total:</Title>

            <Badge variant="light" color="orange" size="lg">
              {numeral(totalPaymentsAmount).format(
                `${org?.currency.symbol}0,0.[00]`,
              )}
            </Badge>
          </Group>
        </Box>

        <Group flex={0} justify="flex-end">
          <Button
            size="xs"
            leftSection={<TbRestore />}
            variant="outline"
            onClick={openResetModal}
            disabled={validPaymentsCount === 0}
          >
            Reset
          </Button>

          <PaymentsSummaryModal>
            {open => (
              <Button
                size="xs"
                leftSection={<TbCheck />}
                disabled={validPaymentsCount === 0}
                onClick={open}
              >
                Process Salaries
              </Button>
            )}
          </PaymentsSummaryModal>
        </Group>
      </Flex>

      <Input
        placeholder="Search employees..."
        mb="sm"
        w="50%"
        onChange={e => setSearch(e.target.value)}
      />
    </Box>
  )
}

export default memo(SalariesHeader)
