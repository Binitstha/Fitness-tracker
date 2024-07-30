/*
  Warnings:

  - Added the required column `category` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCarbs` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFats` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Meal` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `protein` INTEGER NOT NULL,
    ADD COLUMN `totalCarbs` INTEGER NOT NULL,
    ADD COLUMN `totalFats` INTEGER NOT NULL;
