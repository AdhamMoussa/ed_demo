/*
  Warnings:

  - You are about to drop the column `year` on the `SalaryPayment` table. All the data in the column will be lost.
  - Changed the type of `month` on the `SalaryPayment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SalaryPayment" DROP COLUMN "year",
DROP COLUMN "month",
ADD COLUMN     "month" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "isGratuity" DROP NOT NULL,
ALTER COLUMN "isGratuity" SET DEFAULT false;
