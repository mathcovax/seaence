-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_searchResult" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "articleType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_searchResult" ("articleType", "provider", "url") SELECT "articleType", "provider", "url" FROM "searchResult";
DROP TABLE "searchResult";
ALTER TABLE "new_searchResult" RENAME TO "searchResult";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
