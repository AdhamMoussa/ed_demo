import { z } from 'zod'

export const salaryPaymentSchema = z.object({
  basicSalary: z
    .number({ required_error: 'Basic Salary is required' })
    .gt(0, 'Basic Salary must be greater than 0'),
  allowances: z.number(),
  additions: z.number(),
  deductions: z.number(),
  month: z
    .string({ required_error: 'Month is required' })
    .datetime({ message: 'Invalid month' }),
  isGratuity: z.boolean().optional(),
})

export const salaryPaymentsInputSchema = z.object({
  payments: z.record(z.string(), salaryPaymentSchema),
})

export type SalaryPayment = z.infer<typeof salaryPaymentSchema>
export type SalaryPaymentsInput = z.infer<typeof salaryPaymentsInputSchema>
