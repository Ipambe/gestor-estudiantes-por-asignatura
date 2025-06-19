import { Estudiante } from './Estudiante'
import { OperationResult } from './OperationResult'

export class Grupo {
  private estudiantes: Estudiante[] = []

  constructor(public nombre: string) {}

  agregarEstudiante(estudiante: Estudiante): OperationResult<Estudiante> {
    const existe = this.estudiantes.some(
      (e) => e.matricula === estudiante.matricula
    )
    if (existe) {
      return new OperationResult<Estudiante>(
        false,
        null,
        `El estudiante con matrícula ${estudiante.matricula} ya está registrado en el grupo.`
      )
    }
    this.estudiantes.push(estudiante)
    return new OperationResult<Estudiante>(true, estudiante, null)
  }

  obtenerEstudiantes(): Estudiante[] {
    return this.estudiantes
  }

  registrarNota(matricula: string, nota: number): OperationResult<null> {
    const estudiante = this.estudiantes.find((e) => e.matricula === matricula)
    if (estudiante) {
      try {
        estudiante.agregarCalificacion(nota)
        return new OperationResult<null>(true)
      } catch (error: any) {
        return new OperationResult<null>(false, null, error.message)
      }
    }
    return new OperationResult<null>(
      false,
      null,
      `No se encontró estudiante con matrícula ${matricula}`
    )
  }

  listarCalificaciones(): string[] {
    return this.estudiantes.map((e) => e.mostrarInfo())
  }

  porcentajeAprobados(): number {
    const total = this.estudiantes.length
    const aprobados = this.estudiantes.filter((e) => e.estaAprobado()).length
    return total > 0 ? (aprobados / total) * 100 : 0
  }

  eliminarEstudiante(estudiante: Estudiante): OperationResult<Estudiante> {
    const indice = this.estudiantes.indexOf(estudiante)
    if (indice === -1) {
      return new OperationResult<Estudiante>(
        false,
        null,
        `El estudiante con matrícula ${estudiante.matricula} no está registrado en el grupo.`
      )
    }
    this.estudiantes.splice(indice, 1)
    return new OperationResult<Estudiante>(true, estudiante, null)
  }
}
