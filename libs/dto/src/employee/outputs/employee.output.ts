import { z } from 'zod'

export const employeeOutputSchema = z.object({
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
  salaryPayments: z.array(
    z.object({
      month: z.string().datetime(),
    }),
  ),
})

export type EmployeeOutput = z.infer<typeof employeeOutputSchema>
