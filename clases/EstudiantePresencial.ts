import { Estudiante } from './Estudiante'

export class EstudiantePresencial extends Estudiante {
  tipo(): string {
    return 'Presencial'
  }
}
