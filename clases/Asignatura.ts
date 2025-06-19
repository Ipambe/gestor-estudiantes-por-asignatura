import { Grupo } from './Grupo'
import { OperationResult } from './OperationResult'

export class Asignatura {
  private grupos: Grupo[] = []

  constructor(public nombre: string) {}

  agregarGrupo(grupo: Grupo): OperationResult<Grupo> {
    const existe = this.grupos.some((g) => g.nombre === grupo.nombre)
    if (existe) {
      return new OperationResult<Grupo>(
        false,
        null,
        `El grupo "${grupo.nombre}" ya existe en la asignatura "${this.nombre}".`
      )
    }
    this.grupos.push(grupo)
    return new OperationResult<Grupo>(true, grupo, null)
  }

  obtenerGrupos(): Grupo[] {
    return this.grupos
  }

  obtenerGrupo(nombre: string): Grupo | undefined {
    return this.grupos.find((g) => g.nombre === nombre)
  }

  eliminarGrupo(grupo: Grupo): OperationResult<Grupo> {
    const indice = this.grupos.indexOf(grupo)
    if (indice === -1) {
      return new OperationResult<Grupo>(
        false,
        null,
        `El grupo "${grupo.nombre}" no existe en la asignatura "${this.nombre}".`
      )
    }
    this.grupos.splice(indice, 1)
    return new OperationResult<Grupo>(true, grupo, null)
  }
}
