/*
  Warnings:

  - Added the required column `date` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "date" TEXT NOT NULL;
