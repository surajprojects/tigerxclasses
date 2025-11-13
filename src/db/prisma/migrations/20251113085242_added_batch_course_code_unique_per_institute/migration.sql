/*
  Warnings:

  - A unique constraint covering the columns `[code,userId]` on the table `Batch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code,userId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Batch_code_userId_key" ON "Batch"("code", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_userId_key" ON "Course"("code", "userId");
