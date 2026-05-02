# Examen Junio 2024 - HarleyDawson

Gestion de entregas de motos Harley-Davidson.

## Apartados

### Backend - API REST (0.5 puntos, formato antiguo)
- Entidad `Delivery`: plate, model, color, displacement (int), address, clientName, status (String).
- Estados: PENDING, CANCELLED, FINALIZED.
- Endpoints: GET lista (filtrado por status, ordenado por displacement DESC),
  POST crear (duplicado por plate -> 409), PUT actualizar status, DELETE cancelar.
- DTOs con `record`, Mapper asumido.

### Frontend - SPA React (2 puntos, traducido de Angular)
- Pagina unica con todo:
  - Formulario para dar de alta una entrega (plate, model, color, displacement, address, clientName).
    - Si ya existe una moto con esa matricula: `alert("Moto pendiente de envio")`.
  - Lista "Entregas pendientes" (ordenadas por cilindrada DESC):
    cada item muestra datos + boton "Cancelar Entrega" + boton "Entrega Finalizada".
    - "Cancelar Entrega": DELETE, se elimina de la lista.
    - "Entrega Finalizada": PUT con status=FINALIZED, pasa a la lista de finalizadas.
  - Lista "Entregas finalizadas": solo muestra datos, sin botones.

### Docker - Multistage (1.5 puntos)
- Dockerfile con 3 stages: node:20.12.0 (frontend), maven:3.17.0 (backend), openjdk-jre:21.0.0 (runtime).
- build.sh: imagen `daw/harleydawson:1.0.0`.

## Notas
- Formato antiguo (2024): el examen original pedia MVC + SPA + Docker multistage.
  Aqui solo resolvemos la parte API REST + SPA (React) + Docker.
- El frontend se traduce de Angular a React con TypeScript y framework mode
  (React Router 7 con `routes.ts`, `clientLoader`, `clientAction`).
