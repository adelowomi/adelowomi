-- AlterTable
ALTER TABLE `registration` ADD COLUMN `attended` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `attendedAt` DATETIME(3) NULL;
