/*
  Warnings:

  - You are about to drop the `PostTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PostTag` DROP FOREIGN KEY `PostTag_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostTag` DROP FOREIGN KEY `PostTag_tagId_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `postTags` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `PostTag`;

-- DropTable
DROP TABLE `Tag`;
