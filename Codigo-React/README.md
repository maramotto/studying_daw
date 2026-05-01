# React · Curso progresivo con React Router

Repositorio de ejemplos (`exam`) y ejercicios (`exer`) del curso de React basado en React Router.

El contenido está organizado de forma incremental: cada proyecto añade una pieza sobre el anterior (o abre un bloque nuevo cuando cambia de tema).

## Visión general del curso

- Objetivo: aprender React desde fundamentos hasta aplicaciones con rutas, estado global, consumo de APIs y despliegue.
- Enfoque: progresión guiada por proyectos pequeños (`exam`) + consolidación en ejercicios más completos (`exer`).
- Resultado esperado: poder construir una SPA con arquitectura por componentes, estado gestionado, integración REST y UI moderna.

## Ruta de aprendizaje por módulos

1. Fundamentos de renderizado y eventos
2. Estado y estilos reactivos
3. Formularios
4. Componentes, props y composición
5. Context y store global
6. REST y asincronía
7. Routing avanzado y loaders
8. Frameworks de UI
9. Build y publicación

## Progresión incremental de ejemplos (`exam`)

### Fundamentos y estado inicial

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam0_minimal](exam0_minimal/) | Punto de partida mínimo del proyecto React Router. |
| [exam1_render_var](exam1_render_var/) | Primer renderizado dinámico con variables en JSX. |
| [exam2_html_var](exam2_html_var/) | Introduce condicionales con bloques `if/else` en render. |
| [exam3_conditional](exam3_conditional/) | Simplifica condicionales con operador ternario en JSX. |
| [exam4_compact_conditional](exam4_compact_conditional/) | Condicional compacto con `&&` para casos sin `else`. |
| [exam5_array](exam5_array/) | Renderizado de listas con `map` y uso de `key`. |
| [exam6_array_conditional](exam6_array_conditional/) | Combina listas y condicionales dentro de iteraciones. |
| [exam7_event](exam7_event/) | Primer manejo de eventos con funciones de callback. |
| [exam8_compact_event](exam8_compact_event/) | Variante compacta de eventos con funciones inline. |
| [exam9_state](exam9_state/) | Cambio de bloque: introduce `useState` y render reactivo. |

### Estado complejo y estilos

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam10_state_object](exam10_state_object/) | Estado como objeto y actualización inmutable con spread. |
| [exam11_state_array](exam11_state_array/) | Estado como array y transformaciones inmutables. |
| [exam12_render_style](exam12_render_style/) | Aplicación de estilos con `className` y `style` en JSX. |
| [exam13_style_state](exam13_style_state/) | Estilos condicionados por estado (UI reactiva visual). |

### Inputs y formularios

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam14_input_read](exam14_input_read/) | Cambio de bloque: lectura de inputs con `useRef`. |
| [exam15_input_sync](exam15_input_sync/) | Sincronización input-estado con `value` + `onChange`. |
| [exam16_form_read](exam16_form_read/) | Lectura de formularios completos con submit y `FormData`. |
| [exam17_form_sync](exam17_form_sync/) | Formularios controlados campo a campo. |

### Componentes y composición

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam18_components](exam18_components/) | Cambio de bloque: extracción a componentes reutilizables. |
| [exam19_props](exam19_props/) | Paso de datos entre componentes con props. |
| [exam20_props_events](exam20_props_events/) | Paso de eventos/callbacks por props (hijo → padre). |
| [exam21_children](exam21_children/) | Composición con `children`. |
| [exam22_sync_components](exam22_sync_components/) | Sincronización de estado entre varios componentes. |

### Estado global

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam23_context](exam23_context/) | Cambio de bloque: estado compartido con Context API. |
| [exam24_context_state](exam24_context_state/) | Context con estado interno y proveedor completo. |
| [exam25_store](exam25_store/) | Salto de arquitectura: store global (Zustand). |

### REST y asincronía

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam26_rest](exam26_rest/) | Cambio de bloque: consumo de API REST con `fetch`. |
| [exam27_rest_action](exam27_rest_action/) | Manejo de acciones asíncronas con estado de envío. |
| [exam28_rest_service](exam28_rest_service/) | Extracción de llamadas HTTP a capa `service`. |
| [exam29_rest_store](exam29_rest_store/) | Integración de REST con store global. |
| [exam30_rest_effect](exam30_rest_effect/) | Carga automática con `useEffect`. |

### Routing avanzado

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam31_routes](exam31_routes/) | Cambio de bloque: rutas anidadas con `Outlet` y navegación. |
| [exam32_routes_rest](exam32_routes_rest/) | Routing + datos REST por vistas. |
| [exam33_routes_loader](exam33_routes_loader/) | Carga de datos con `loader` antes del render. |

### UI frameworks

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam34_bootstrap_css](exam34_bootstrap_css/) | Cambio de bloque: estilado con Bootstrap CSS. |
| [exam35_bootstrap_modal](exam35_bootstrap_modal/) | Uso de componentes Bootstrap avanzados (modal). |
| [exam36_material](exam36_material/) | Alternativa de diseño con Material UI. |

### Build y publicación

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exam37_build](exam37_build/) | Cambio de bloque: generación de build para despliegue. |
| [exam38_build_folder](exam38_build_folder/) | Variante de publicación en carpeta específica. |

## Progresión incremental de ejercicios (`exer`)

### Línea Items

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exer1_items](exer1_items/) | Ejercicio base: lista simple con alta de elementos. |
| [exer2_items_checked](exer2_items_checked/) | Evoluciona a ítems con estado marcado/no marcado. |
| [exer3_items_components](exer3_items_components/) | Refactor a componentes reutilizables. |
| [exer4_items_context](exer4_items_context/) | Cambio de bloque: estado compartido con Context API. |
| [exer5_items_store](exer5_items_store/) | Migra Context a store global. |
| [exer6_items_rest](exer6_items_rest/) | Integra persistencia REST del listado. |
| [exer7_items_rest_proxy](exer7_items_rest_proxy/) | Mejora la integración REST con capa proxy/servicio. |

### Línea Books

| Proyecto | Qué aporta respecto al anterior |
| --- | --- |
| [exer8_books](exer8_books/) | Cambio de tema: nuevo dominio (libros) con rutas. |
| [exer9_books_rest](exer9_books_rest/) | Añade carga REST para catálogo de libros. |
| [exer10_books_router](exer10_books_router/) | Mejora con enfoque de routing/data loader. |
| [exer11_books_components](exer11_books_components/) | Refactor visual/componentes sobre el flujo de libros. |

## Proyectos backend de apoyo

Estos proyectos complementan ejercicios REST y sirven para práctica de integración frontend-backend:

- [exer6_items_backend](exer6_items_backend/): backend de soporte para la línea de ejercicios de Items.
- [exer9_books_backend](exer9_books_backend/): backend de soporte para la línea de ejercicios de Books.
