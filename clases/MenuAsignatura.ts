import inquirer from 'inquirer'
import { MenuBase } from './MenuBase'
import { Docente } from './Docente'
import { Asignatura } from './Asignatura'

export class MenuAsignatura extends MenuBase {
  constructor(private docente: Docente) {
    super()
  }

  async mostrarMenu(): Promise<void> {
    console.log()
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: `--- Menú Gestión de asignaturas de ${this.docente.nombre} ---`,
        pageSize: 100,
        choices: [
          { name: 'Agregar una asignatura', value: '1' },
          { name: 'Ver todas las asignaturas', value: '2' },
          { name: 'Eliminar una asignatura', value: '3' },
          { name: 'Volver al menú principal', value: '0' }
        ]
      }
    ])
    return this.procesarOpcion(opcion)
  }

  async procesarOpcion(opcion: string): Promise<void> {
    switch (opcion) {
      case '1': {
        const { asignatura } = await inquirer.prompt([
          {
            type: 'input',
            name: 'asignatura',
            message: 'Ingrese el nombre de la asignatura:',
            validate: (input) => {
              return input.trim()
                ? true
                : 'El nombre de la asignatura no puede estar vacío.'
            }
          }
        ])

        const asignaturaObj = new Asignatura(asignatura)
        const resultado = this.docente.agregarAsignatura(asignaturaObj)

        if (resultado.success) {
          console.log(`Asignatura "${asignatura}" agregada exitosamente.`)
        } else {
          console.error(`Error al agregar asignatura: ${resultado.error}`)
        }

        break
      }

      case '2': {
        if (this.asignaturas.length === 0) {
          console.log('No hay asignaturas registradas.')
        } else {
          console.log('Asignaturas registradas:')
          this.asignaturas.forEach((a) => console.log(`- ${a.nombre}`))
        }
        break
      }

      case '3': {
        if (this.asignaturas.length === 0) {
          console.log('No hay asignaturas registradas para eliminar.')
          break
        }

        const { asignatura } = await inquirer.prompt([
          {
            type: 'list',
            name: 'asignatura',
            message: 'Seleccione la asignatura a eliminar:',
            choices: this.asignaturas.map((a) => ({ name: a.nombre, value: a }))
          }
        ])

        const resultado = this.docente.eliminarAsignatura(asignatura)
        if (resultado.success) {
          console.log(
            `Asignatura "${asignatura.nombre}" eliminada exitosamente.`
          )
        } else {
          console.error(`Error al eliminar asignatura: ${resultado.error}`)
        }

        break
      }
      case '0': {
        console.log('Volviendo al menú principal...')
        return
      }
    }
    return this.mostrarMenu()
  }

  private get asignaturas(): Asignatura[] {
    return this.docente.obtenerAsignaturas()
  }
}
