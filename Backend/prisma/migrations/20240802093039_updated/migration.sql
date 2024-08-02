-- CreateTable
CREATE TABLE `WaterGoal` (
    `id` VARCHAR(191) NOT NULL,
    `target` VARCHAR(191) NOT NULL,
    `targetDate` VARCHAR(191) NOT NULL,
    `achieved` BOOLEAN NOT NULL DEFAULT false,
    `currentWaterAmout` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WaterGoal` ADD CONSTRAINT `WaterGoal_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
