/*
  Warnings:

  - You are about to drop the column `nome` on the `Manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Owner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Manufacturer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Manufacturer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Manufacturer_nome_key` ON `Manufacturer`;

-- DropIndex
DROP INDEX `Owner_nome_key` ON `Owner`;

-- AlterTable
ALTER TABLE `Manufacturer` DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Owner` DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Manufacturer_name_key` ON `Manufacturer`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Owner_name_key` ON `Owner`(`name`);
