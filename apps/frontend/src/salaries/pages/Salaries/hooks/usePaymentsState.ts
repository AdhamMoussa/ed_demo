import { useMemo } from 'react'

import { useSalariesPaymentStore } from '../stores/salaries-payment'

import { SalaryPayment, salaryPaymentSchema } from '@ed-demo/dto'

export const usePaymentsState = () => {
  const payments = useSalariesPaymentStore(state => state.payments)

  const validPayments = useMemo(() => {
    return Object.entries(payments)
      .filter(([, payment]) => salaryPaymentSchema.safeParse(payment).success)
      .reduce((acc, [id, payment]) => {
        acc[id] = payment as SalaryPayment
        return acc
      }, {} as Record<string, SalaryPayment>)
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

  const totalDeductions = useMemo(() => {
    return Object.values(validPayments).reduce(
      (total, { deductions = 0 }) => total + deductions,
      0,
    )
  }, [validPayments])

  const totalAdditions = useMemo(() => {
    return Object.values(validPayments).reduce(
      (total, { additions = 0 }) => total + additions,
      0,
    )
  }, [validPayments])

  const endOfServiceCount = useMemo(() => {
    return Object.values(validPayments).filter(({ isGratuity }) => isGratuity)
      .length
  }, [validPayments])

  return {
    validPayments,
    totalPaymentsAmount,
    validPaymentsCount,
    totalDeductions,
    totalAdditions,
    endOfServiceCount,
  }
}
