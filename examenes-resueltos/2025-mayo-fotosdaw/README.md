# Examen Mayo 2025 - FotosDaw (Inmobiliaria)

## Resumen del enunciado

- **Dominio:** Anuncios de alquiler de casas.
- **Entidad:** Ad (title, description, price, rented).
- **Puntuacion:** API REST (2p) + Frontend SPA (2.5p) + Docker Compose (1.5p) = 6p.

## Apartados

### Backend (2p) - API REST

- Entity Ad con JPA.
- DTO como record.
- Repository con queries derivadas: filtrar por rented + ordenar por price, buscar por title.
- Service con CRUD + validacion de duplicado por titulo (devuelve null si existe).
- RestController: GET /?rented=, GET /{id}, POST / (409 si duplicado), PUT /{id}, DELETE /{id}.

### Frontend (2.5p) - SPA React (traducido de Angular)

- Pagina principal: titulo "FotosDaw", formulario de alta, dos listas (alquiler / alquiladas).
- Pagina detalle: titulo, descripcion, precio. Botones: eliminar, alquilar/finalizar.
- Validacion de duplicado: alert() si el POST devuelve error.

### Docker (1.5p)

- docker-compose.yaml con web (daw/fotosdaw:1.0.0, puerto 8443) + db (mysql:8.0).

## Notas

- Frontend traducido de Angular a React TypeScript con framework mode (routes.ts, clientLoader).
- Backend copiado de la solucion del profesor con correcciones menores.
