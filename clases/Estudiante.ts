export abstract class Estudiante {
  constructor(
    public matricula: string,
    public nombre: string,
    protected calificaciones: number[] = []
  ) {}

  agregarCalificacion(nota: number): void {
    if (nota < 0 || nota > 100)
      throw new Error('La calificación debe estar entre 0 y 100')
    else if (this.obtenerAcumulado() + nota > 100)
      throw new Error(
        `La calificación total no puede exceder 100, actualmente es ${this.obtenerAcumulado()}`
      )
    this.calificaciones.push(nota)
  }

  obtenerCalificaciones(): number[] {
    return this.calificaciones
  }

  obtenerAcumulado(): number {
    return this.calificaciones.reduce((a, b) => a + b, 0)
  }

  estaAprobado(): boolean {
    return this.obtenerAcumulado() >= 70
  }

  abstract tipo(): string

  mostrarInfo(): string {
    return `${this.tipo()} - ${this.nombre} (${
      this.matricula
    }) - Promedio: ${this.obtenerAcumulado().toFixed(2)} - ${
      this.estaAprobado() ? 'Aprobado' : 'Reprobado'
    }`
  }
}
