import inquirer from 'inquirer'
import { MenuBase } from './MenuBase'
import { MenuAsignatura } from './MenuAsignatura'
import { MenuGrupo } from './MenuGrupo'
import { MenuEstudiante } from './MenuEstudiante'
import { Docente } from './Docente'
import { Asignatura } from './Asignatura'
import { Grupo } from './Grupo'

export class MenuPrincipal extends MenuBase {
  constructor(private docente: Docente) {
    super()
  }

  async mostrarMenu(): Promise<void> {
    console.log()
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: `--- Menú Principal ---`,
        pageSize: 100,
        choices: [
          { name: 'Gestión de asignaturas', value: '1' },
          { name: 'Gestión de grupos', value: '2' },
          { name: 'Gestión de estudiantes', value: '3' },
          { name: 'Salir', value: '0' }
        ]
      }
    ])
    return this.procesarOpcion(opcion)
  }
  async procesarOpcion(opcion: string): Promise<void> {
    switch (opcion) {
      case '1': {
        const menuAsignatura = new MenuAsignatura(this.docente)
        return await menuAsignatura.mostrarMenu()
      }

      case '2': {
        const asignatura = await this.seleccionarAsignatura(this.docente)
        if (!asignatura) break

        const menuGrupo = new MenuGrupo(asignatura)
        return await menuGrupo.mostrarMenu()
      }

      case '3': {
        const asignatura = await this.seleccionarAsignatura(this.docente)
        if (!asignatura) break

        const grupo = await this.seleccionarGrupo(asignatura)
        if (!grupo) break

        const menuEstudiante = new MenuEstudiante(grupo)
        return await menuEstudiante.mostrarMenu()
      }

      case '0': {
        console.log('Saliendo del programa...')
        process.exit(0)
      }
    }
    return this.mostrarMenu()
  }

  private async seleccionarAsignatura(
    docente: Docente,
    mensaje = 'Seleccione una asignatura:'
  ): Promise<Asignatura | null> {
    const asignaturas = docente.obtenerAsignaturas()
    if (asignaturas.length === 0) {
      console.log('No hay asignaturas registradas.')
      return null
    }
    const { asignatura } = await inquirer.prompt<{ asignatura: Asignatura }>([
      {
        type: 'list',
        name: 'asignatura',
        message: mensaje,
        choices: asignaturas.map((a) => ({ name: a.nombre, value: a }))
      }
    ])

    return asignatura
  }

  private async seleccionarGrupo(
    asignatura: Asignatura,
    mensaje = 'Selecciona el grupo:'
  ): Promise<Grupo | null> {
    const grupos = asignatura.obtenerGrupos()
    if (grupos.length === 0) {
      console.log('No hay grupos en la asignatura seleccionada.')
      return null
    }
    const { grupo } = await inquirer.prompt<{ grupo: Grupo }>([
      {
        type: 'list',
        name: 'grupo',
        message: mensaje,
        choices: grupos.map((g) => ({ name: g.nombre, value: g }))
      }
    ])
    return grupo
  }
}
