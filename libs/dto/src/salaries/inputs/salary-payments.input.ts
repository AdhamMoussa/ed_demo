import { z } from 'zod'

import { PaginatedInputSchema } from '../../common'

export const salaryPaymentsInputSchema = PaginatedInputSchema.extend({
  search: z.string().optional(),
})

export type SalaryPaymentsInput = z.infer<typeof salaryPaymentsInputSchema>
