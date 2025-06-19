import { Docente } from './clases/Docente'
import { MenuPrincipal } from './clases/MenuPrincipal'

const docente = new Docente('Francis Ramirez')
const menuPrincipal = new MenuPrincipal(docente)

async function main() {
  console.clear()
  while (true) {
    await menuPrincipal.mostrarMenu()
  }
}

main()
