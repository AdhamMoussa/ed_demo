import { z } from 'zod'
import { getPaginatedOutputSchema } from '../../common/outputs/paginated.output'

const PaymentOutputSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  emplyeeName: z.string(),
  basicSalary: z.number(),
  allowances: z.number(),
  additions: z.number(),
  deductions: z.number(),
  month: z.string(),
  isGratuity: z.boolean(),
  paymentDate: z.string(),
})

export const salaryPaymentsOutputSchema =
  getPaginatedOutputSchema(PaymentOutputSchema)

export type SalaryPaymentsOutput = z.infer<typeof salaryPaymentsOutputSchema>
export type PaymentOutput = z.infer<typeof PaymentOutputSchema>
