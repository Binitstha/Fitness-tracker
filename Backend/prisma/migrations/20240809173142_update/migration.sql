/*
  Warnings:

  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;