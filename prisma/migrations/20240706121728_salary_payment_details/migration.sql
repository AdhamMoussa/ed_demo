/*
  Warnings:

  - Added the required column `additions` to the `SalaryPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deductions` to the `SalaryPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGratuity` to the `SalaryPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "SalaryPayment" ADD COLUMN     "additions" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "deductions" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "isGratuity" BOOLEAN NOT NULL,
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
