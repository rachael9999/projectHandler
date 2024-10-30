/*
  Warnings:

  - You are about to drop the column `createAT` on the `board` table. All the data in the column will be lost.
  - You are about to drop the column `createAT` on the `list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `board` DROP COLUMN `createAT`,
    ADD COLUMN `createdAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `list` DROP COLUMN `createAT`,
    ADD COLUMN `createdAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
