/*
  Warnings:

  - A unique constraint covering the columns `[staffId,organizationId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Employee_staffId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_staffId_organizationId_key" ON "Employee"("staffId", "organizationId");
