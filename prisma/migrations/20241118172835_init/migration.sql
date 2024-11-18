/*
  Warnings:

  - Added the required column `clientId` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Manufacturer` ADD COLUMN `clientId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Owner` ADD COLUMN `clientId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Manufacturer` ADD CONSTRAINT `Manufacturer_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Owner` ADD CONSTRAINT `Owner_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
