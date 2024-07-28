/*
  Warnings:

  - Changed the type of `name` on the `Categories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryName" AS ENUM ('Application', 'FrontEnd', 'Infrastructure', 'MachineLearning', 'Mobile', 'Security', 'Culture');

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "name",
ADD COLUMN     "name" "CategoryName" NOT NULL;
