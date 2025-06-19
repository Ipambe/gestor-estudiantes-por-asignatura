import inquirer from 'inquirer'
import { Asignatura } from './Asignatura'
import { MenuBase } from './MenuBase'
import { Grupo } from './Grupo'

export class MenuGrupo extends MenuBase {
  constructor(private asignatura: Asignatura) {
    super()
  }

  async mostrarMenu(): Promise<void> {
    console.log()
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: `--- Menú Gestión de grupos de la asignatura "${this.asignatura.nombre}" ---`,
        pageSize: 100,
        choices: [
          { name: 'Agregar un grupo a la asignatura', value: '1' },
          { name: 'Ver grupos de la asignatura', value: '2' },
          { name: 'Eliminar un grupo', value: '3' },
          { name: 'Volver al menú principal', value: '0' }
        ]
      }
    ])
    return this.procesarOpcion(opcion)
  }

  async procesarOpcion(opcion: string): Promise<void> {
    switch (opcion) {
      case '1': {
        const { grupo } = await inquirer.prompt<{
          grupo: string
        }>([
          {
            type: 'input',
            name: 'grupo',
            message: 'Ingrese el nombre del grupo:',
            validate: (input) => {
              return input.trim()
                ? true
                : 'El nombre del grupo no puede estar vacío.'
            }
          }
        ])

        const nuevoGrupo = new Grupo(grupo)
        const resultado = this.asignatura.agregarGrupo(nuevoGrupo)
        if (resultado.success) {
          console.log(
            `Grupo "${grupo}" agregado a la asignatura "${this.asignatura.nombre}" exitosamente.`
          )
        } else {
          console.error(`Error al agregar grupo: ${resultado.error}`)
        }

        break
      }

      case '2': {
        if (this.grupos.length === 0) {
          console.log(
            `No hay grupos registrados para la asignatura "${this.asignatura.nombre}".`
          )
        } else {
          console.log(`Grupos de la asignatura "${this.asignatura.nombre}":`)
          this.grupos.forEach((g) => console.log(`- ${g.nombre}`))
        }
        break
      }

      case '3': {
        if (this.grupos.length === 0) {
          console.log(
            `No hay grupos registrados para eliminar en la asignatura "${this.asignatura.nombre}".`
          )
          break
        }

        const { grupo } = await inquirer.prompt<{
          grupo: Grupo
        }>([
          {
            type: 'list',
            name: 'grupo',
            message: 'Seleccione el grupo a eliminar:',
            choices: this.grupos.map((g) => ({
              name: g.nombre,
              value: g
            }))
          }
        ])

        const resultado = this.asignatura.eliminarGrupo(grupo)
        if (resultado.success) {
          console.log(
            `Grupo "${grupo.nombre}" eliminado de la asignatura "${this.asignatura.nombre}" exitosamente.`
          )
        } else {
          console.error(`Error al eliminar grupo: ${resultado.error}`)
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

  private get grupos(): Grupo[] {
    return this.asignatura.obtenerGrupos()
  }
}
