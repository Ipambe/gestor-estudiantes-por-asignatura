# Práctica: Gestión de estudiantes por asignatura

## Objetivo

- Aplicar conceptos de herencia, clases derivadas y polimorfismo.
- Diseñar una estructura orientada a objetos que represente un escenario real.
- Implementar entrada de datos, procesamiento de calificaciones y generación de reportes.
- Usar buenas prácticas de encapsulamiento, reutilización de código y abstracción.

## Enunciado del problema

Se quiere crear una aplicación para que cada docente de la universidad pueda llevar el control de sus estudiantes. Un docente puede impartir una o más asignaturas, y en cada asignatura puede tener diferentes grupos. Los estudiantes pueden ser presenciales o a distancia. Al iniciar el cuatrimestre, el docente recibe una lista con los estudiantes inscritos en cada asignatura.

La aplicación debe permitir que el docente escriba desde el teclado la lista de estudiantes y registre las calificaciones obtenidas en exámenes o prácticas. También debe poder generar un listado con las notas y calcular el porcentaje de alumnos aprobados por grupo.

## Requisitos del sistema(mínimo)

- Identificar las clases necesarias para el sistema
- Funcionalidades
  1. Agregar estudiantes a un grupo dentro de una asignatura.
  2. Registrar calificaciones de exámenes y prácticas.
  3. Mostrar listado de calificaciones por grupo.
  4. Calcular porcentaje de estudiantes aprobados (nota ≥ 70).

## Instrucciones

- Diseña las clases utilizando herencia y polimorfismo para manejar distintos tipos de estudiantes.
- Implementa entrada de datos por teclado.
- Usa estructuras como arrays, ArrayList, o colecciones similares para almacenar estudiantes.
- Aplica sobreescritura de métodos donde sea necesario (por ejemplo, para mostrar datos o calcular notas).
- Presenta tu código bien estructurado y comentado en su repositorio de github y agregar enlace a su informe.

## Consideraciones

- No usar bases de datos, todo debe ser en memoria usando el arrays.
- Maneja los errores con un modelo de respuesta OperationResult, donde esta clase debe tener las siguientes propiedades message: string, success:bool y data:dynamic.

## Entrega

- Informe con su hoja de presentación
- Captura de pantalla del programa ejecutado mostrando el funcionamiento de cada una de las operaciones.
- Subir código fuente con comentarios a su github e incluir enlace en el informe.
