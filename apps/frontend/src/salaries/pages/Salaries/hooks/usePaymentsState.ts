import { useMemo } from 'react'

import { useSalariesPaymentStore } from '../stores/salaries-payment'

import { salaryPaymentSchema } from '@ed-demo/dto'

export const usePaymentsState = () => {
  const payments = useSalariesPaymentStore(state => state.payments)

  const validPayments = useMemo(() => {
    return payments.filter(
      payment => salaryPaymentSchema.safeParse(payment).success,
    )
  }, [payments])

  const totalPaymentsAmount = useMemo(() => {
    return validPayments.reduce(
      (
        total,
        { basicSalary = 0, allowances = 0, additions = 0, deductions = 0 },
      ) => {
        return total + basicSalary + allowances + additions - deductions
      },
      0,
    )
  }, [validPayments])

  const validPaymentsCount = validPayments.length

  const totalBasicSalaries = useMemo(() => {
    return validPayments.reduce(
      (total, { basicSalary = 0 }) => total + basicSalary,
      0,
    )
  }, [validPayments])

  const totalAllowances = useMemo(() => {
    return validPayments.reduce(
      (total, { allowances = 0 }) => total + allowances,
      0,
    )
  }, [validPayments])

  const totalDeductions = useMemo(() => {
    return validPayments.reduce(
      (total, { deductions = 0 }) => total + deductions,
      0,
    )
  }, [validPayments])

  const totalAdditions = useMemo(() => {
    return validPayments.reduce(
      (total, { additions = 0 }) => total + additions,
      0,
    )
  }, [validPayments])

  const endOfServiceCount = useMemo(() => {
    return validPayments.filter(({ isGratuity }) => isGratuity).length
  }, [validPayments])

  return {
    validPayments,
    totalPaymentsAmount,
    validPaymentsCount,
    totalBasicSalaries,
    totalAllowances,
    totalDeductions,
    totalAdditions,
    endOfServiceCount,
  }
}
