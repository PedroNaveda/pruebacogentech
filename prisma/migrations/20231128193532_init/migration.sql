-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "dateadd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateupdate" TIMESTAMP(3) NOT NULL,
    "useradd" TEXT NOT NULL,
    "userupdate" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "supervisor" BOOLEAN,
    "supervisorid" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
