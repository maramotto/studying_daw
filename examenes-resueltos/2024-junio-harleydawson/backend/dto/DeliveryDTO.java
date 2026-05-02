public record DeliveryDTO(
    Long id,
    String plate,
    String model,
    String color,
    int displacement,
    String address,
    String clientName,
    String status) {
}
