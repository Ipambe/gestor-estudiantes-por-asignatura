import { Asignatura } from '../clases/Asignatura'
import { Docente } from '../clases/Docente'
import { EstudiantePresencial } from '../clases/EstudiantePresencial'
import { EstudianteVirtual } from '../clases/EstudianteVirtual'
import { Grupo } from '../clases/Grupo'

export function seed(docente: Docente) {
  const asignatura = new Asignatura('Estructuras de Datos')
  const grupo = new Grupo('Grupo #1')
  const estudiante1 = new EstudiantePresencial(
    '2023-1025',
    'Rafael Adolfo Rosa'
  )
  const estudiante2 = new EstudiantePresencial('1010-2020', 'Juan Perez')
  const estudiante3 = new EstudianteVirtual('6253-7204', 'Maria Lopez')
  const estudiante4 = new EstudiantePresencial('9671-4627', 'Ana Maria Torres')
  const estudiante5 = new EstudianteVirtual('8362-1028', 'Carlos Gomez')
  const estudiante6 = new EstudiantePresencial('9023-3466', 'Luisa Martinez')
  const estudiante7 = new EstudianteVirtual('2635-7813', 'Pedro Ramirez')
  const estudiante8 = new EstudiantePresencial('2019-6432', 'Sofia Torres')
  const estudiante9 = new EstudianteVirtual('4621-7542', 'Andres Gomez')
  grupo.agregarEstudiante(estudiante1)
  grupo.agregarEstudiante(estudiante2)
  grupo.agregarEstudiante(estudiante3)
  grupo.agregarEstudiante(estudiante4)
  grupo.agregarEstudiante(estudiante5)
  grupo.agregarEstudiante(estudiante6)
  grupo.agregarEstudiante(estudiante7)
  grupo.agregarEstudiante(estudiante8)
  grupo.agregarEstudiante(estudiante9)
  grupo.registrarNota(estudiante1.matricula, 70)
  grupo.registrarNota(estudiante2.matricula, 85)
  grupo.registrarNota(estudiante3.matricula, 62)
  grupo.registrarNota(estudiante4.matricula, 99)
  grupo.registrarNota(estudiante5.matricula, 51)
  grupo.registrarNota(estudiante6.matricula, 51)
  grupo.registrarNota(estudiante7.matricula, 88)
  grupo.registrarNota(estudiante8.matricula, 84)
  grupo.registrarNota(estudiante9.matricula, 85)
  asignatura.agregarGrupo(grupo)
  docente.agregarAsignatura(asignatura)
}
