/*
  Warnings:

  - You are about to drop the column `currentValue` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `previousValue` on the `Operation` table. All the data in the column will be lost.
  - Added the required column `expression` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Operation" DROP COLUMN "currentValue",
DROP COLUMN "previousValue",
ADD COLUMN     "expression" TEXT NOT NULL;
