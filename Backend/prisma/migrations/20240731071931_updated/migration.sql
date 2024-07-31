/*
  Warnings:

  - You are about to drop the column `category` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Meal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Meal` DROP COLUMN `category`,
    DROP COLUMN `type`;
