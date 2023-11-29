import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Employee {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  supervisorid: number | null;
  children?: Employee[];
}

export async function GET() {
  try {
    // Obtener la estructura jerárquica de los empleados
    const hierarchy = await prisma.employee.findMany({
      orderBy: { supervisorid: 'asc' },
    });

    // Función para construir la estructura jerárquica
    const buildHierarchy = (
      employees: Employee[],
      supervisorid: number | null
    ): Employee[] => {
      return employees
        .filter((employee) => employee.supervisorid === supervisorid)
        .map((employee) => ({
          ...employee,
          children: buildHierarchy(employees, employee.id),
        }));
    };

    // Construir la estructura jerárquica inicial
    const hierarchicalEmployees = buildHierarchy(hierarchy, null);

    return NextResponse.json({
      data: hierarchicalEmployees,
      message: 'Getting Employees Hierarchy',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
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