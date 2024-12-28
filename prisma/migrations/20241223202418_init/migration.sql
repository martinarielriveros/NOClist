-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "logModel" (
    "id" SERIAL NOT NULL,
    "level" "SeverityLevel" NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logModel_pkey" PRIMARY KEY ("id")
);
