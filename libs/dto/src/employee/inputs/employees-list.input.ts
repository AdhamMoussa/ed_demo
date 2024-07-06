import { z } from 'zod'

import { PaginatedInputSchema } from '../../common/inputs/paginated.input'

export const employeesListInputSchema = PaginatedInputSchema.extend({
  search: z.string().optional(),
})

export type EmployeesLisInput = z.infer<typeof employeesListInputSchema>
