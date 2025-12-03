-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Batch" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "StudentCourse" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "StudentDocument" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "StudentTransfer" ADD COLUMN     "deletedOn" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedOn" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "UserPayment" ADD COLUMN     "deletedOn" TIMESTAMP(3);
