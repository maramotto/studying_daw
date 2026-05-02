// Interfaz TypeScript que refleja la entidad Time del backend.
// Coincide campo a campo con los campos de la API REST.
export default interface Time {
  id?: number;
  numLap: number;
  lapTime: string;
}
