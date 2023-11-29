/*
  Warnings:

  - You are about to drop the column `useradd` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `userupdate` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "useradd",
DROP COLUMN "userupdate";
