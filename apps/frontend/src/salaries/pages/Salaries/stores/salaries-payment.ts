import { create } from 'zustand'
import { produce } from 'immer'

import {
  EmployeeOutput,
  SalaryPayment,
  SalaryPaymentsInput,
} from '@ed-demo/dto'

type SalariesPaymentStore = {
  payments: SalaryPaymentsInput['payments']
  setPayment: (
    employee: EmployeeOutput,
    payment: Partial<SalaryPayment>,
  ) => void
  removePayment: (employee: EmployeeOutput) => void
  clear: () => void
}

export const useSalariesPaymentStore = create<SalariesPaymentStore>(set => ({
  payments: [],

  setPayment: (employee, payment) => {
    set(state =>
      produce(state, draft => {
        const currentPayment = draft.payments.find(
          p => p.employeeId === employee.id,
        )

        if (currentPayment) {
          currentPayment.additions =
            payment.additions ?? currentPayment.additions
          currentPayment.deductions =
            payment.deductions ?? currentPayment.deductions
          currentPayment.month = payment.month ?? currentPayment.month
          currentPayment.isGratuity =
            payment.isGratuity ?? currentPayment.isGratuity
        } else {
          draft.payments.push({
            additions: 0,
            deductions: 0,
            month: '',
            isGratuity: false,
            employeeId: employee.id,
            basicSalary: employee.basicSalary,
            allowances: employee.allowances.reduce(
              (acc, allowance) => acc + allowance.amount,
              0,
            ),
            ...payment,
          })
        }
      }),
    )
  },

  removePayment: employee =>
    set(state =>
      produce(state, draft => {
        const paymentIndex = draft.payments.findIndex(
          p => p.employeeId === employee.id,
        )
        draft.payments.splice(paymentIndex, 1)
      }),
    ),

  clear: () => set({ payments: [] }),
}))
