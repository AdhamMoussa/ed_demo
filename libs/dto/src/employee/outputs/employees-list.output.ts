import { z } from 'zod'

import { getPaginatedOutputSchema } from '../../common/outputs/paginated.output'

const employeeSchema = z.object({
  id: z.string(),
  staffId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  basicSalary: z.number(),
  allowances: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
    }),
  ),
  joinedAt: z.string().datetime(),
})

export const employeesListOutputSchema =
  getPaginatedOutputSchema(employeeSchema)

export type EmployeesListOutput = z.infer<typeof employeesListOutputSchema>
