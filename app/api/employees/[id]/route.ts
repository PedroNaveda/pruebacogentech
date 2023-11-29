import { NextResponse } from 'next/server'
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface Params {
    params : { id: string};
}

export async function GET(request: Request, { params } : Params){
    
    try {
        const employ = await prisma.employee.findFirst({
            where:{
                id: Number(params.id),
            },
        });
        if (!employ)
        return NextResponse.json({ message: "Employ not found" }, { status: 404 }); 

        return NextResponse.json({
          data: employ,
          message: 'Getting a single Employ',
        });
      } catch (error) {
        console.error(error);
        return NextResponse.error();
      }
}

export async function DELETE(request: Request, { params } : Params){
    try {
        const deletedEmploy = await prisma.employee.delete({
            where:{
                id: Number(params.id),
            },
        });
        if (!deletedEmploy)
        return NextResponse.json({ message: "Employ not found" }, { status: 404 }); 
       
        return NextResponse.json({
          data: deletedEmploy,
          message: 'Deleting a Employ',
        });
      } catch (error) {        
        console.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === "P2025"){
                return NextResponse.json({ message: "Employ not found" }, { status: 404 });
            }
        }; 
        return NextResponse.error();
      }
}

export async function PUT(request: Request, { params }: Params) {
    try {
      const employ = await request.json();
  
      // Verificar si se proporciona supervisorid
      if (employ.supervisorid) {
        // Obtener el empleado actual para incrementar el campo version
        const currentEmploy = await prisma.employee.findUnique({
          where: { id: Number(params.id) },
        });
  
        if (!currentEmploy) {
          return NextResponse.json({ message: "Employ not found" }, { status: 404 });
        }
  
        // Actualizar el empleado incrementando el campo version
        const updatedEmploy = await prisma.employee.update({
          where: {
            id: Number(params.id),
          },
          data: {
            name: employ.name,
            lastname: employ.lastname,
            email: employ.email,
            phone: employ.phone,
            supervisor: employ.supervisor,
            supervisorid: employ.supervisorid,
            version: currentEmploy.version + 1,
          },
        });
  
        return NextResponse.json({
          data: updatedEmploy,
          message: 'Updating an Employee',
        });
      } else {
        // No se proporciona supervisorid, actualizar sin incrementar version
        const updatedEmploy = await prisma.employee.update({
          where: {
            id: Number(params.id),
          },
          data: {
            name: employ.name,
            lastname: employ.lastname,
            email: employ.email,
            phone: employ.phone,
            supervisor: employ.supervisor,
          },
        });
  
        if (!updatedEmploy) {
          return NextResponse.json({ message: "Employ not found" }, { status: 404 });
        }
  
        return NextResponse.json({
          data: updatedEmploy,
          message: 'Updating an Employee',
        });
      }
    } catch (error) {
      console.error(error);
  
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return NextResponse.json({ message: "Employ not found" }, { status: 404 });
        }
      }
  
      return NextResponse.error();
    }
  }