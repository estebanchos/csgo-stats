/*
  Warnings:

  - Added the required column `counterScore` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `terroristScore` to the `Games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDefusal` to the `Maps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "counterScore" INTEGER NOT NULL,
ADD COLUMN     "terroristScore" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Maps" ADD COLUMN     "isDefusal" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
