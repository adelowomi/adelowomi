-- CreateTable
CREATE TABLE `CorperApplication` (
    `id` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `serviceState` VARCHAR(191) NOT NULL,
    `batch` VARCHAR(191) NOT NULL,
    `primaryRole` VARCHAR(191) NOT NULL,
    `otherRole` VARCHAR(191) NULL,
    `portfolio` VARCHAR(191) NULL,
    `experience` TEXT NULL,
    `why` TEXT NOT NULL,
    `availability` VARCHAR(191) NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
