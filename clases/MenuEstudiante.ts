import inquirer from 'inquirer'
import { Grupo } from './Grupo'
import { MenuBase } from './MenuBase'
import { EstudiantePresencial } from './EstudiantePresencial'
import { EstudianteVirtual } from './EstudianteVirtual'
import { Estudiante } from './Estudiante'

export class MenuEstudiante extends MenuBase {
  constructor(private grupo: Grupo) {
    super()
  }

  async mostrarMenu(): Promise<void> {
    console.log()
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: `--- Menú Gestión de estudiantes del grupo ${this.grupo.nombre} ---`,
        pageSize: 100,
        choices: [
          { name: 'Agregar estudiante', value: '1' },
          { name: 'Ver estudiantes del grupo', value: '2' },
          { name: 'Eliminar estudiante', value: '3' },
          { name: 'Agregar calificación a un estudiante', value: '4' },
          {
            name: 'Ver acumulado de todos los estudiantes del grupo',
            value: '5'
          },
          {
            name: 'Ver listado de calificaciones de un estudiante del grupo',
            value: '6'
          },
          {
            name: 'Ver porcentaje de estudiantes aprobados/reprobados del grupo',
            value: '7'
          },
          { name: 'Volver al menú principal', value: '0' }
        ]
      }
    ])
    return this.procesarOpcion(opcion)
  }
  async procesarOpcion(opcion: string): Promise<void> {
    switch (opcion) {
      case '1': {
        const { nombre, matricula, tipo } = await inquirer.prompt<{
          nombre: string
          matricula: string
          tipo: 'presencial' | 'virtual'
        }>([
          {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre del estudiante:',
            validate: (input) => {
              return input.trim()
                ? true
                : 'El nombre del estudiante no puede estar vacío.'
            }
          },
          {
            type: 'input',
            name: 'matricula',
            message: 'Ingrese la matrícula del estudiante:',
            validate: (input) => {
              return input.trim()
                ? true
                : 'La matrícula del estudiante no puede estar vacía.'
            }
          },
          {
            type: 'list',
            name: 'tipo',
            message: 'Seleccione el tipo de estudiante:',
            choices: [
              { name: 'Presencial', value: 'presencial' },
              { name: 'Virtual', value: 'virtual' }
            ]
          }
        ])

        let Tipo =
          tipo === 'presencial' ? EstudiantePresencial : EstudianteVirtual
        const nuevoEstudiante = new Tipo(matricula, nombre)
        const resultado = this.grupo.agregarEstudiante(nuevoEstudiante)
        if (resultado.success) {
          console.log(
            `Estudiante "${nombre}" (${matricula}) agregado al grupo "${this.grupo.nombre}".`
          )
        } else {
          console.error(`Error al agregar estudiante: ${resultado.error}`)
        }
        break
      }

      case '2': {
        this.grupo
          .obtenerEstudiantes()
          .forEach((e) => console.log(`- ${e.nombre} (${e.matricula})`))
        break
      }

      case '3': {
        const estudiante = await this.seleccionarEstudiante(
          this.grupo,
          'Seleccione el estudiante para registrar la calificación:'
        )
        if (!estudiante) break

        const resultado = this.grupo.eliminarEstudiante(estudiante)
        if (resultado.success) {
          console.log(
            `Estudiante ${estudiante.nombre} (${estudiante.matricula}) eliminado del grupo "${this.grupo.nombre}".`
          )
        } else {
          console.error(`Error al eliminar estudiante: ${resultado.error}`)
        }
        break
      }

      case '4': {
        const estudiante = await this.seleccionarEstudiante(
          this.grupo,
          'Seleccione el estudiante para agregarle la calificación:'
        )
        if (!estudiante) break

        const { calificacion } = await inquirer.prompt<{
          calificacion: string
        }>([
          {
            type: 'input',
            name: 'calificacion',
            message: 'Ingrese la calificación del estudiante:',
            validate: (input) => {
              const num = parseFloat(input)
              return !isNaN(num) && num >= 0 && num <= 100
                ? true
                : 'La calificación debe ser un número entre 0 y 100.'
            }
          }
        ])

        const resultado = this.grupo.registrarNota(
          estudiante.matricula,
          +calificacion
        )
        if (resultado.success) {
          console.log(
            `Calificación de ${calificacion} agregada a ${estudiante.nombre}.`
          )
        } else {
          console.error(`Error al agregar calificación: ${resultado.error}`)
        }
        break
      }

      case '5': {
        if (this.estudiantes.length === 0) {
          console.log(
            `No hay estudiantes registrados en el grupo "${this.grupo.nombre}".`
          )
          break
        }
        console.log(
          `Acumulado de calificaciones de todos los estudiantes del grupo "${this.grupo.nombre}":`
        )
        this.estudiantes.forEach((e) => {
          const acumulado = e.obtenerAcumulado()
          console.log(`- ${e.nombre} (${e.matricula}): ${acumulado.toFixed(2)}`)
        })
        break
      }

      case '6': {
        const estudiante = await this.seleccionarEstudiante(
          this.grupo,
          'Seleccione el estudiante para ver sus calificaciones:'
        )
        if (!estudiante) break

        const calificaciones = estudiante.obtenerCalificaciones()
        if (calificaciones.length === 0) {
          console.log(
            `El estudiante ${estudiante.nombre} no tiene calificaciones registradas.`
          )
        } else {
          console.log(
            `Calificaciones de ${estudiante.nombre} (${estudiante.matricula}):`
          )
          calificaciones.forEach((c, index) =>
            console.log(`- Calificación ${index + 1}: ${c}`)
          )
          console.log(`Acumulado: ${estudiante.obtenerAcumulado().toFixed(2)}`)
        }
        break
      }

      case '7': {
        const porcentaje = this.grupo.porcentajeAprobados()
        const totalEstudiantes = this.grupo.obtenerEstudiantes().length
        const aprobados = this.grupo
          .obtenerEstudiantes()
          .filter((e) => e.estaAprobado()).length
        console.log(
          `Porcentaje de estudiantes aprobados en el grupo "${
            this.grupo.nombre
          }": ${porcentaje.toFixed(
            2
          )}% (${aprobados} de ${totalEstudiantes} estudiantes)`
        )

        break
      }

      case '0': {
        console.log('Volviendo al menú principal...')
        return
      }
    }
    return this.mostrarMenu()
  }

  private get estudiantes() {
    return this.grupo.obtenerEstudiantes()
  }

  private async seleccionarEstudiante(
    grupo: Grupo,
    mensaje = 'Seleccione un estudiante:'
  ): Promise<Estudiante | null> {
    const estudiantes = grupo.obtenerEstudiantes()
    if (estudiantes.length === 0) {
      console.log('No hay estudiantes registrados en el grupo.')
      return null
    }
    const { estudiante } = await inquirer.prompt<{ estudiante: Estudiante }>([
      {
        type: 'list',
        name: 'estudiante',
        message: mensaje,
        choices: estudiantes.map((e) => ({ name: e.nombre, value: e }))
      }
    ])
    return estudiante
  }
}
