# pruebacogentech

Se diseño una solucion basada en un stack postgresql, nodejs con nextjs y prisma ORM.

Estructura de Datos: se realizo una estructura de datos para almacenar la informacion de los empleados, esta estructura se encuentra en el archivo sql llamado "pruebacogentech.sql" y cuenta con el script de creacion de la base de datos de la tabla y el de inbsercion de los datos de prueba.

Consulta Jerárquica con Versionamiento:   se utilizo prisma.employee.findMany para obtener todos los empleados, ordenados por supervisorid. Luego, se usa la función recursiva buildHierarchy para construir la estructura jerárquica a partir de la lista de empleados obtenida y el resultado final es un objeto que representa la estructura jerárquica de los empleados, con cada empleado que tiene una propiedad children que contiene a sus subordinados. En este código la propiedad supervisorid contiene el id del supervisor al que reporta cada empleado.

Escenario de Actualización: Para este caso, he agregado una verificación para employ.supervisorid. Si ese dato se proporciona, se obtiene el empleado actual (currentEmploy) y se incrementa el campo version en 1 al actualizar el empleado. Si no se proporciona supervisorid, la actualización se realiza sin incrementar el campo version.

Manejo de Nulos:  Prisma maneja automáticamente los valores nulos para el campo supervisorId, por lo que se puede consultar empleados sin un jefe directo utilizando filtros adecuados.  Para manejar mejor la situación de un empleado sin un jefe directo, se puede asignar un valor especial (por ejemplo, -1) en la base de datos y  modificar  el codigo de la consulta jerárquica para pueda manejar estos casos especiales de manera adecuada, enviado un mensaje diferente o un mensaje de error en el caso de que ese campo sea solicitado como obligatorio.

Consumo de los Servicios:

1 GET : este servicio se consume en la siguiente direccion http://URL/api/employees/ con el metodo GET y asi obtener la estructura jerárquica de los empleados.

2 POST : este servicio permite crear un nuevo empleado y se consume en la siguiente direccion http://URL/api/employees/ con el metodo POST y un json que en el body contenga la siguiente estructura:
{ 
  "name":"Pablo",
  "lastname":"Navas",
  "email":"np@employee.com",
  "phone":"5556666",
  "version": 0,
  "supervisorid": 1
}
* el campo  supervisorid es opcional.

3 GET [id] : este servicio se consume en la siguiente direccion http://URL/api/employees/id con el metodo GET y asi obtener la informacion especifica de un empleado por el id.

4 DELETE [id] : este servicio se consume en la siguiente direccion http://URL/api/employees/id con el metodo DELETE y asi eliminar un empleado por el id.

5 PUT [id] : este servicio se consume en la siguiente direccion http://URL/api/employees/id con el metodo PUT y un json que en el body contenga la siguiente estructura:
{ 
  "name":"Pablo",
  "lastname":"Nava",
  "email":"pn@employee.com",
  "phone":"5566666",
  "supervisorid": 2
}
* todos los campos son opcionales, pero debe enviarse al menos uno y al enviar el campo supervisorid se actualiza la version del usuario.