/*
  Warnings:

  - You are about to drop the column `index` on the `DefaultConfig` table. All the data in the column will be lost.
  - Added the required column `notIndex` to the `DefaultConfig` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DefaultConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "notIndex" BOOLEAN NOT NULL
);
INSERT INTO "new_DefaultConfig" ("id") SELECT "id" FROM "DefaultConfig";
DROP TABLE "DefaultConfig";
ALTER TABLE "new_DefaultConfig" RENAME TO "DefaultConfig";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
