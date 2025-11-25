/*
  Warnings:

  - A unique constraint covering the columns `[rollNo,userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNo_userId_key" ON "Student"("rollNo", "userId");
