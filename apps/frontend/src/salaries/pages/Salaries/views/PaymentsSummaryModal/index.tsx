import { memo, useCallback } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import numeral from 'numeral'

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Text,
  Title,
} from '@mantine/core'

import { TbChevronRight } from 'react-icons/tb'

import { useCurrentOrg } from '@fe/organizations/hooks/useCurrentOrg'
import { usePaymentsState } from '../../hooks/usePaymentsState'
import { useSalariesPaymentStore } from '../../stores/salaries-payment'
import { useCreateSalaryPaymentsMutation } from '@fe/salaries/hooks/mutations/useCreateSalaryPaymentsMutation'

type PaymentsSummaryModalProps = {
  children: (open: () => void) => React.ReactNode
}

const PaymentsSummaryModal = (props: PaymentsSummaryModalProps) => {
  const { children } = props

  const [isOpen, { open, close }] = useDisclosure(false)

  const org = useCurrentOrg()

  const {
    totalPaymentsAmount,
    validPaymentsCount,
    totalBasicSalaries,
    totalAllowances,
    totalAdditions,
    totalDeductions,
    endOfServiceCount,
    validPayments,
  } = usePaymentsState()
  const clearStore = useSalariesPaymentStore(state => state.clear)

  const { mutate: createPayment, isPending } = useCreateSalaryPaymentsMutation()

  const submitHandler = useCallback(() => {
    createPayment(
      { payments: validPayments },
      {
        onSuccess: () => {
          clearStore()
          close()

          notifications.show({
            message: 'Payments processed successfully',
            color: 'green',
          })
        },
      },
    )
  }, [clearStore, close, createPayment, validPayments])

  return (
    <>
      {children(open)}

      {isOpen && (
        <Modal
          opened
          onClose={close}
          title={<Title order={4}>Your Salary Payments Summary</Title>}
          size="lg"
        >
          <Box mb="lg">
            <Text c="gray.7" mb="lg">
              You're about to pay <strong>{validPaymentsCount}</strong>{' '}
              employees a total of{' '}
              <strong>
                {numeral(totalPaymentsAmount).format(
                  `${org?.currency.symbol}0,0.[00]`,
                )}
              </strong>{' '}
              in salaries.
            </Text>

            <Card mb="lg" bg="gray.1">
              <Group justify="space-between">
                <Title order={6}>Basic Salaries:</Title>
                <Badge color="green" variant="light" size="lg">
                  {numeral(totalBasicSalaries).format(
                    `${org?.currency.symbol}0,0.[00]`,
                  )}
                </Badge>
              </Group>

              <Group justify="space-between">
                <Title order={6}>Total Allowances:</Title>
                <Badge color="green" variant="light" size="lg">
                  {numeral(totalAllowances).format(
                    `${org?.currency.symbol}0,0.[00]`,
                  )}
                </Badge>
              </Group>

              <Group justify="space-between">
                <Title order={6}>Total Additions:</Title>
                <Badge color="green" variant="light" size="lg">
                  {numeral(totalAdditions).format(
                    `${org?.currency.symbol}0,0.[00]`,
                  )}
                </Badge>
              </Group>

              <Group justify="space-between">
                <Title order={6}>Total Deductions:</Title>
                <Badge color="red" variant="light" size="lg">
                  {numeral(totalDeductions).format(
                    `${org?.currency.symbol}0,0.[00]`,
                  )}
                </Badge>
              </Group>
            </Card>

            <Text>
              It's the end of service for{' '}
              <strong>{endOfServiceCount} employees</strong>.
            </Text>
          </Box>

          <Flex justify="flex-end">
            <Group>
              <Button
                size="sm"
                variant="outline"
                color="dark"
                loading={isPending}
                onClick={close}
              >
                Cancel
              </Button>

              <Button
                size="sm"
                rightSection={<TbChevronRight />}
                loading={isPending}
                onClick={submitHandler}
              >
                Proceed
              </Button>
            </Group>
          </Flex>
        </Modal>
      )}
    </>
  )
}

export default memo(PaymentsSummaryModal)
