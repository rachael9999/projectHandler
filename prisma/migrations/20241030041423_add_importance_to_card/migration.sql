/*
  Warnings:

  - You are about to drop the column `labelColor` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `labelText` on the `card` table. All the data in the column will be lost.
  - Added the required column `importance` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `card` DROP COLUMN `labelColor`,
    DROP COLUMN `labelText`,
    ADD COLUMN `importance` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL;
