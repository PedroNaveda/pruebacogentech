import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const employees = await prisma.employee.findMany();

  return NextResponse.json({
    data: employees,
    message: 'Getting Employees',
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const employee = await prisma.employee.create({
      data,
    });

    return NextResponse.json({
      data: employee,
      message: 'Employee created successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
