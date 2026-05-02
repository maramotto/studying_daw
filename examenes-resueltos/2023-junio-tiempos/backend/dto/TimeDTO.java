// DTO con record de Java moderno.
// Refleja los campos de la entidad Time.
// En este examen (2023) no se pedian DTOs, pero lo incluimos
// porque en 2026 se pediran seguro y asi el patron es consistente.

public record TimeDTO(
    Long id,
    int numLap,
    String lapTime) {
}
