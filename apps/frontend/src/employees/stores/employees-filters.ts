import { create } from 'zustand'

import { EmployeesLisInput } from '@ed-demo/dto'

type EmployeesFiltersStore = EmployeesLisInput & {
  setSearch: (search: string) => void
  setPage: (page: number) => void
}

export const useEmployeesFiltersStore = create<EmployeesFiltersStore>(set => ({
  page: 1,
  limit: 10,
  search: '',
  setSearch: search => set({ search }),
  setPage: page => set({ page }),
}))
