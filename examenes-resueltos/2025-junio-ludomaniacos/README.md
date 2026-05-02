# Examen Junio 2025 - Ludomaniacos

Tienda de juegos de mesa.

## Apartados

### Backend - API REST (2 puntos)
- Entidad `Game`: name, price, stock, discount (boolean).
- Endpoints CRUD: GET lista (con filtro `?discount=true/false`, top 10 por precio DESC),
  GET detalle, POST crear, PUT actualizar (si stock llega a 0 se borra), DELETE eliminar.
- DTOs con `record`, Mapper asumido.

### Frontend - SPA React (2.5 puntos)
- Pagina principal: formulario para crear juego + dos listas (top 10 con oferta, top 10 sin oferta).
  - Sin oferta: nombre (link a detalle) + precio base.
  - Con oferta: nombre (link) + precio tachado + precio con 20% descuento.
- Pagina detalle: nombre (+ "Ultimas unidades" en rojo si stock < 3), precio base,
  precio oferta si aplica, stock.
  - Boton "Comprar": stock - 1; si llega a 0 se borra y muestra "Juego no disponible".
  - Boton "Poner en oferta": discount = true.
  - Boton "Eliminar": borra y navega a /.
- Si el juego no existe/fue borrado: solo mostrar "Juego no disponible".

### Docker Compose (1.5 puntos)
- Imagen web: `daw/ludomaniacos:1.0.0`, puerto 443:8443, restart on-failure.
- Imagen db: `mysql:8.0`, sin exponer puerto 3306.
- Variables de entorno para Spring y MySQL.

## Bugs corregidos respecto a la solucion del profesor
- `GenerationType.AUTO` (el original tenia `generatedType.AUTO`).
- Faltaba `;` en `private Long id`.
- Constructor: `double price` en vez de `int price`.
- `@Autowired` (el original tenia `@Autowireds`).
- Repository: `findTop10ByDiscountOrderByPriceDesc` (faltaba `Desc`).
- Controller `createGame`: tipo de retorno `ResponseEntity<GameDTO>`.
- Docker Compose: sin espacios en asignacion de variables de entorno.
