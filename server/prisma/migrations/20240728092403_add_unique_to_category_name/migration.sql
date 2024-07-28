/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BlogToCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogToCategories" DROP CONSTRAINT "_BlogToCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogToCategories" DROP CONSTRAINT "_BlogToCategories_B_fkey";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "_BlogToCategories";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" "CategoryName" NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnBlogs" (
    "blogId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnBlogs_pkey" PRIMARY KEY ("blogId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "CategoriesOnBlogs" ADD CONSTRAINT "CategoriesOnBlogs_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnBlogs" ADD CONSTRAINT "CategoriesOnBlogs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
