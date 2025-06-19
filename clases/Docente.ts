import { Asignatura } from './Asignatura'
import { OperationResult } from './OperationResult'

export class Docente {
  private asignaturas: Asignatura[] = []

  constructor(public nombre: string) {}

  agregarAsignatura(asignatura: Asignatura): OperationResult<Asignatura> {
    const existe = this.asignaturas.some((a) => a.nombre === asignatura.nombre)
    if (existe) {
      return new OperationResult<Asignatura>(
        false,
        null,
        `La asignatura "${asignatura.nombre}" ya está registrada.`
      )
    }
    this.asignaturas.push(asignatura)
    return new OperationResult<Asignatura>(true, asignatura, null)
  }

  obtenerAsignaturas(): Asignatura[] {
    return this.asignaturas
  }

  obtenerAsignatura(nombre: string): Asignatura | undefined {
    return this.asignaturas.find((a) => a.nombre === nombre)
  }

  eliminarAsignatura(asignatura: Asignatura): OperationResult<Asignatura> {
    const indice = this.asignaturas.indexOf(asignatura)
    if (indice === -1) {
      return new OperationResult<Asignatura>(
        false,
        null,
        `La asignatura "${asignatura.nombre}" no existe.`
      )
    }
    this.asignaturas.splice(indice, 1)
    return new OperationResult<Asignatura>(true, asignatura, null)
  }
}
