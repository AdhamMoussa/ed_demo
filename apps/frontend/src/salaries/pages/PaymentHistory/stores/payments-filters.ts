import { create } from 'zustand'

import { SalaryPaymentsInput } from '@ed-demo/dto'

type PaymentsFiltersStore = SalaryPaymentsInput & {
  setSearch: (search: string) => void
  setPage: (page: number) => void
}

export const usePaymentsFiltersStore = create<PaymentsFiltersStore>(set => ({
  page: 1,
  limit: 10,
  search: '',
  setSearch: search => set({ search, page: 1 }),
  setPage: page => set({ page }),
}))
