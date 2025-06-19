export abstract class MenuBase {
  abstract mostrarMenu(): Promise<void>
  abstract procesarOpcion(opcion: string): Promise<void>
}
