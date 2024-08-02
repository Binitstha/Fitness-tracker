-- CreateTable
CREATE TABLE `Water` (
    `id` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Water` ADD CONSTRAINT `Water_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
