/*
  Warnings:

  - You are about to drop the column `calories` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `Meal` table. All the data in the column will be lost.
  - Added the required column `totalCalories` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalProtein` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Meal` DROP COLUMN `calories`,
    DROP COLUMN `protein`,
    ADD COLUMN `totalCalories` INTEGER NOT NULL,
    ADD COLUMN `totalProtein` INTEGER NOT NULL;
