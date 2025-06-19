import { Estudiante } from './Estudiante'

export class EstudianteVirtual extends Estudiante {
  tipo(): string {
    return 'Virtual'
  }
}
