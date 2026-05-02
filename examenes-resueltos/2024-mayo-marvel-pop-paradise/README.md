# Examen Mayo 2024 - Marvel Pop Paradise

Tienda de Funko Pops de Marvel.

## Apartados

### Backend - API REST (2 puntos)
- Entidad `Product`: name, price (double), sold (boolean), address (String nullable), sent (boolean).
- El profesor original uso un campo `status` (FOR_SALE, SOLD, SENT) en lugar de dos booleanos.
  Aqui usamos `sold` + `sent` como pide el enunciado mas literalmente.
- Endpoints: GET lista (no vendidos, ordenados por precio DESC),
  GET productos a enviar (sold=true, sent=false, solo ADMIN),
  PUT comprar (solo CLIENT), PUT enviar (solo ADMIN).
- WebSecurityConfig con dos roles: ROLE_CLIENT y ROLE_ADMIN.

### Frontend - SPA React (2 puntos)
- Pagina principal: titulo "Marvel Pop Paradise", lista de productos no vendidos
  ordenados por precio DESC. Cada uno muestra nombre, precio (rojo si >=100,
  verde si <100), boton "Comprar". Admin ve link a pagina de admin.
- Pagina de compra: titulo "Realizar compra", formulario con direccion de envio
  + boton "Confirmar". Al confirmar: marca producto como vendido, redirige a /.
- Pagina admin: titulo "Productos a enviar", lista de vendidos-no-enviados.
  Cada uno muestra nombre, direccion, boton "Enviado". Al pulsar: marca como
  enviado y desaparece de la lista.

### Docker - Multistage NGINX (2 puntos)
- Dockerfile multistage: node:20.12.2 (build SPA) + nginx:1.26.0 (servir).
- build.sh: build + push imagen daw/marvel-pop-paradise:1.0.0.

## Notas
- Examen formato antiguo (2024): pedia MVC + SPA + Docker multistage.
  Solo traducimos la parte SPA (Angular -> React) y mantenemos backend + Docker.
- El backend original del profesor era muy simplificado (sin Service, sin DTOs).
  Aqui lo mejoramos al estilo 2025 con Service y DTOs para practicar el patron.
- Frontend traducido de Angular a React con TypeScript y framework mode
  segun las decisiones del CLAUDE.md.
