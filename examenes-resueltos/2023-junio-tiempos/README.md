# Examen Junio 2023 - Tiempos F1

Las 33 primeras vueltas de Alonso. Registro de tiempos por vuelta.

## Apartados

### Backend - API REST (0.5 puntos)
- Entidad `Time`: numLap (int), lapTime (String, formato "00:00:00").
- Endpoints: GET lista ordenada por vuelta ASC, POST crear (409 si vuelta duplicada), DELETE eliminar.
- Sin DTOs (examen antiguo, formato simple).

### Frontend - SPA React (2 puntos)
- Pagina unica: titulo "Las 33 primeras vueltas de Alonso".
- Formulario: numero de vuelta + tiempo. Si vuelta duplicada: alert("Vuelta ya asignada").
- Lista ordenada por vuelta ASC: cada fila muestra "Vuelta X: HH:MM:SS" + boton "Borrar".
- "Borrar" elimina del backend y recarga la lista.

### Docker - Multistage (1.5 puntos)
- Dockerfile multistage: 3 etapas (node:16.0.0, maven:3.11.0, openjdk-jre:17.0.0).
- Script build.sh: build + push "daw/tiempos:1.0.0".

## Notas
- Examen formato antiguo (2023): pedia MVC + SPA. Aqui solo se resuelve la parte REST + SPA.
- Es el examen mas sencillo: una sola entidad, una sola pagina, sin vista de detalle.
- Frontend traducido de Angular a React (TypeScript, framework mode).
