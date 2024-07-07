import { create } from 'zustand'
import { produce } from 'immer'

import { EmployeeOutput, SalaryPayment } from '@ed-demo/dto'

type SalariesPaymentStore = {
  payments: Record<string, Partial<SalaryPayment>>
  setPayment: (
    employee: EmployeeOutput,
    payment: Partial<SalaryPayment>,
  ) => void
  removePayment: (employee: EmployeeOutput) => void
  clear: () => void
}

export const useSalariesPaymentStore = create<SalariesPaymentStore>(set => ({
  payments: {},

  setPayment: (employee, payment) => {
    set(state =>
      produce(state, draft => {
        draft.payments[employee.id] = {
          additions: 0,
          deductions: 0,
          basicSalary: employee.basicSalary,
          isGratuity: false,
          ...draft.payments[employee.id],
          ...payment,
        }

        if (
          !draft.payments[employee.id].allowances &&
          employee.allowances.length > 0
        ) {
          draft.payments[employee.id].allowances = employee.allowances.reduce(
            (acc, item) => acc + item.amount,
            0,
          )
        }
      }),
    )
  },

  removePayment: employee =>
    set(state =>
      produce(state, draft => {
        delete draft.payments[employee.id]
      }),
    ),

  clear: () => set({ payments: {} }),
}))
