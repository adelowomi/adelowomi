-- CreateTable
CREATE TABLE `VolunteerForm` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VolunteerFormQuestion` (
    `id` VARCHAR(191) NOT NULL,
    `volunteerFormId` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `type` ENUM('TEXT', 'TEXTAREA', 'EMAIL', 'PHONE', 'MULTIPLE_CHOICE', 'CHECKBOX', 'DATE', 'TIME') NOT NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,
    `options` TEXT NULL,
    `order` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VolunteerSubmission` (
    `id` VARCHAR(191) NOT NULL,
    `volunteerFormId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `VolunteerSubmission_volunteerFormId_email_key`(`volunteerFormId`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VolunteerAnswer` (
    `id` VARCHAR(191) NOT NULL,
    `submissionId` VARCHAR(191) NOT NULL,
    `questionId` VARCHAR(191) NOT NULL,
    `answer` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `VolunteerAnswer_submissionId_questionId_key`(`submissionId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VolunteerForm` ADD CONSTRAINT `VolunteerForm_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerFormQuestion` ADD CONSTRAINT `VolunteerFormQuestion_volunteerFormId_fkey` FOREIGN KEY (`volunteerFormId`) REFERENCES `VolunteerForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerSubmission` ADD CONSTRAINT `VolunteerSubmission_volunteerFormId_fkey` FOREIGN KEY (`volunteerFormId`) REFERENCES `VolunteerForm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerAnswer` ADD CONSTRAINT `VolunteerAnswer_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `VolunteerSubmission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VolunteerAnswer` ADD CONSTRAINT `VolunteerAnswer_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `VolunteerFormQuestion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
