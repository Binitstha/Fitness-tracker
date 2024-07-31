/*
  Warnings:

  - Added the required column `foods` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Meal` ADD COLUMN `foods` VARCHAR(191) NOT NULL,
    MODIFY `date` VARCHAR(191) NOT NULL;
