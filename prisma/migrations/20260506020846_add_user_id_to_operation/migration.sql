/*
  Warnings:

  - Added the required column `userId` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Operation" ADD COLUMN     "userId" TEXT NOT NULL;
