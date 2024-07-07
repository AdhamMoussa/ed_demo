import { useMemo } from 'react'

import { useSalariesPaymentStore } from '../stores/salaries-payment'

import { salaryPaymentSchema } from '@ed-demo/dto'

export const usePaymentsState = () => {
  const payments = useSalariesPaymentStore(state => state.payments)

  const validPayments = useMemo(() => {
    return Object.entries(payments)
      .filter(([, payment]) => salaryPaymentSchema.safeParse(payment).success)
      .reduce((acc, [id, payment]) => {
        acc[id] = payment
        return acc
      }, {} as typeof payments)
  }, [payments])

  const totalPaymentsAmount = useMemo(() => {
    return Object.values(validPayments).reduce(
      (
        total,
        { basicSalary = 0, allowances = 0, additions = 0, deductions = 0 },
      ) => {
        return total + basicSalary + allowances + additions - deductions
      },
      0,
    )
  }, [validPayments])

  const validPaymentsCount = useMemo(
    () => Object.keys(validPayments).length,
    [validPayments],
  )

  return {
    validPayments,
    totalPaymentsAmount,
    validPaymentsCount,
  }
}
