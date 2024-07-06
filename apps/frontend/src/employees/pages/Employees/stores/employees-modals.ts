import { create } from 'zustand'
import { produce } from 'immer'

import { EmployeeOutput } from '@ed-demo/dto'

type EmployeesModalsStore = {
  addEmployee: {
    isOpen: boolean
    open: () => void
    close: () => void
  }
  editEmployee: {
    open: (employee: EmployeeOutput) => void
    close: () => void
  } & (
    | { isOpen: false; employee: null }
    | { isOpen: true; employee: EmployeeOutput }
  )
  archiveEmployee: {
    open: (employee: EmployeeOutput) => void
    close: () => void
  } & (
    | { isOpen: false; employee: null }
    | { isOpen: true; employee: EmployeeOutput }
  )
}

export const useEmployeesModalsStore = create<EmployeesModalsStore>(set => ({
  addEmployee: {
    isOpen: false,
    open: () =>
      set(state =>
        produce(state, draft => {
          draft.addEmployee.isOpen = true
        }),
      ),
    close: () =>
      set(state =>
        produce(state, draft => {
          draft.addEmployee.isOpen = false
        }),
      ),
  },
  editEmployee: {
    isOpen: false,
    employee: null,
    open: (employee: EmployeeOutput) =>
      set(state =>
        produce(state, draft => {
          draft.editEmployee.isOpen = true
          draft.editEmployee.employee = employee
        }),
      ),
    close: () =>
      set(state =>
        produce(state, draft => {
          draft.editEmployee.isOpen = false
          draft.editEmployee.employee = null
        }),
      ),
  },
  archiveEmployee: {
    isOpen: false,
    employee: null,
    open: (employee: EmployeeOutput) =>
      set(state =>
        produce(state, draft => {
          draft.archiveEmployee.isOpen = true
          draft.archiveEmployee.employee = employee
        }),
      ),
    close: () =>
      set(state =>
        produce(state, draft => {
          draft.archiveEmployee.isOpen = false
          draft.archiveEmployee.employee = null
        }),
      ),
  },
}))
