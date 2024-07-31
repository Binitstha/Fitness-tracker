/*
  Warnings:

  - You are about to drop the column `description` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `category` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Meal` DROP COLUMN `description`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL;
