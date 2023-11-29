# pruebacogentech

Se diseñó una solución basada en un stack postgresql, nodejs con nextjs y prisma ORM.
URL del Repositorio:  https://github.com/PedroNaveda/pruebacogentech

Estructura de Datos: se realizo una estructura de datos para almacenar la información de los empleados, esta estructura se encuentra en el archivo sql llamado "pruebacogentech.sql" y cuenta con el script de creación de la base de datos de la tabla y el de inserción de los datos de prueba.

Consulta Jerárquica con Versionamiento:   se utilizó prisma.employee.findMany para obtener todos los empleados, ordenados por supervisorid. Luego, se usa la función recursiva buildHierarchy para construir la estructura jerárquica a partir de la lista de empleados obtenida y el resultado final es un objeto que representa la estructura jerárquica de los empleados, con cada empleado que tiene una propiedad children que contiene a sus subordinados. En este código la propiedad supervisorid contiene el id del supervisor al que reporta cada empleado.

Escenario de Actualización: Para este caso, he agregado una verificación para employ.supervisorid. Si ese dato se proporciona, se obtiene el empleado actual (currentEmploy) y se incrementa el campo versión en 1 al actualizar el empleado. Si no se proporciona supervisorid, la actualización se realiza sin incrementar el campo versión.

Manejo de Nulos:  Prisma maneja automáticamente los valores nulos para el campo supervisorId, por lo que se puede consultar empleados sin un jefe directo utilizando filtros adecuados.  Para manejar mejor la situación de un empleado sin un jefe directo, se puede asignar un valor especial (por ejemplo, -1) en la base de datos y  modificar  el código de la consulta jerárquica para pueda manejar estos casos especiales de manera adecuada, enviado un mensaje diferente o un mensaje de error en el caso de que ese campo sea solicitado como obligatorio.
Consumo de los Servicios:
Para las pruebas en el local cambiar URL por localhost:3000 o 12.0.0.1:3000
donde 3000 corresponde al puerto donde está configurado por default el servidor de js

1 GET : este servicio se consume en la siguiente dirección http://URL/api/employees/ con el método GET y así obtener la estructura jerárquica de los empleados.

2 POST : este servicio permite crear un nuevo empleado y se consume en la siguiente dirección http://URL/api/employees/ con el método POST y un json que en el body contenga la siguiente estructura:
{ 
  "name":"Pablo",
  "lastname":"Navas",
  "email":"np@employee.com",
  "phone":"5556666",
  "version": 0,
  "supervisorid": 1
}
* el campo  supervisorid es opcional.

3 GET [id] : este servicio se consume en la siguiente dirección http://URL/api/employees/id con el método GET y así obtener la información específica de un empleado por el id.

4 DELETE [id] : este servicio se consume en la siguiente dirección http://URL/api/employees/id con el método DELETE y así eliminar un empleado por el id.

5 PUT [id] : este servicio se consume en la siguiente dirección http://URL/api/employees/id con el método PUT y un json que en el body contenga la siguiente estructura:
{ 
  "name":"Pablo",
  "lastname":"Nava",
  "email":"pn@employee.com",
  "phone":"5566666",
  "supervisorid": 2
}
* todos los campos son opcionales, pero debe enviarse al menos uno y al enviar el campo supervisorid se actualiza la version del usuario