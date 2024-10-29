/*
  Warnings:

  - Added the required column `message` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auditlog` ADD COLUMN `message` TEXT NOT NULL;
