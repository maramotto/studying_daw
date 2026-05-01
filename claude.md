# CLAUDE.md — Examen Práctico DAW 2026

> Este fichero contiene las instrucciones para **Claude Code (CC)** sobre cómo
> ayudarme a preparar el ejercicio práctico (examen) de la asignatura
> **Desarrollo de Aplicaciones Web** (3º Grado en Ingeniería del Software).

---

## 1. Contexto

- **Asignatura:** Desarrollo de Aplicaciones Web (DAW), 3º GIS.
- **Examen:** 20 de mayo de 2026.
- **Duración:** 90 minutos.
- **Puntuación:** 0–6 puntos. Necesito **4/6 para aprobar**.
- **Nivel actual de React del estudiante:** **CERO**. Nunca lo he usado. Hay que explicarlo todo.
- **Nivel actual de Angular, Spring Boot, Docker:** Aprobada la entrega práctica de 2025, conocimientos sólidos.

### ⚠️ Restricción crítica (no obvia)

> **El código que entrego en el examen NO tiene que compilar.**
> En 90 minutos es imposible escribir todo lo que piden y que compile.
> Es código *escrito a mano* (en el editor del examen) que el profesor lee y
> evalúa por su corrección conceptual, no por su ejecución.
>
> **Implicación:** las plantillas y snippets deben optimizarse para **escribirse
> rápido y memorizarse fácil**, no para ser ejecutables.
> No hace falta `package.json` ni `pom.xml` ni `index.html` ni `main.jsx` etc.
> Solo los ficheros que el enunciado pida explícitamente.

---

## 2. Materiales disponibles en el repositorio

```
.
├── claude.md                          ← este fichero
├── Ejercicios Prácticos/              ← exámenes de años anteriores
│   ├── Ejercicio práctico Junio 2023/
│   ├── Ejercicio práctico Mayo 2024/
│   ├── Ejercicio práctico Junio 2024/
│   ├── Ejercicio Práctico Mayo 2025/
│   └── Ejercicio Práctico Junio 2025/
│       ├── Enunciado/    (PDF del examen)
│       └── Solucion/     (código solución del profesor: backend, frontend Angular, docker)
│
├── Ejemplo-2026/                      ← ejemplo de la ENTREGA PRÁCTICA 2026 (no del examen)
│   ├── ejemplo-practica1/             (Spring MVC + Mustache)
│   ├── ejemplo-practica2/             (+ API REST + dockerización)
│   └── ejemplo-practica3/             (+ frontend React) ← MUY RELEVANTE
│
├── Codigo-React/                      ← código React de ejemplos del profesor
└── Teoria-React/                      ← teoría React del profesor (PDFs)
```

### Importancia de cada material

1. **Ejercicios Prácticos / Mayo 2025 y Junio 2025**: máxima prioridad.
   Son los exámenes más recientes y más representativos del formato 2026.
2. **Ejercicios Prácticos / 2023 y 2024**: segunda prioridad.
   Útiles para ver patrones que se repiten, pero pedían un híbrido MVC + SPA
   (formato antiguo). Nos interesa solo la parte SPA + REST + Docker.
3. **Ejemplo-2026/ejemplo-practica3**: contiene el frontend React del profesor.
   Útil para inferir su estilo de código React, **PERO ATENCIÓN**: ese código
   es para la *entrega práctica completa*, no para el examen. Usa
   `react-bootstrap`, TypeScript y React Router 7 framework mode, cosas que
   probablemente **NO se usen en el examen** (ver §4).
4. **Codigo-React** y **Teoria-React**: material didáctico oficial del profesor.
   **CC debe leerlos en la Fase 2** para confirmar las decisiones técnicas
   por defecto (ver §4).

---

## 3. Análisis de los 5 exámenes anteriores (patrones inferidos)

| Año-Mes | Dominio | Backend | Frontend | Docker | DTOs |
|---|---|---|---|---|---|
| 2023-Jun | F1 lap times | MVC + REST (0.5p) | Angular SPA (2p) | Multistage (1.5p) | No |
| 2024-May | Marvel Pop Paradise | MVC + Auth roles (2p) | Angular SPA (2p) | Multistage NGINX (2p) | No |
| 2024-Jun | HarleyDawson motos | MVC + REST (0.5p) | Angular SPA (2p) | Multistage (1.5p) | No |
| **2025-May** | **FotosDaw inmobiliaria** | **API REST pura (2p)** | **Angular SPA (2.5p)** | **Docker Compose (1.5p)** | **Sí (Mapper asumido)** |
| **2025-Jun** | **Ludomaniacos juegos** | **API REST pura (2p)** | **Angular SPA (2.5p)** | **Docker Compose (1.5p)** | **Sí (Mapper asumido)** |

### Patrones que SIEMPRE se repiten

- 3 carpetas de entrega: `backend/`, `frontend/`, `docker/`.
- ZIP con nombre `XXX-Examen-MES.zip` (XXX = iniciales del alumno).
- Backend Spring Boot + SpringData + JPA.
- Una entidad principal con CRUD + alguna acción de cambio de estado.
- Validación de duplicado en la creación → mensaje de error.
- Listado ordenado por algún campo.
- Frontend SPA con HTML plano (sin librerías de componentes ni CSS).
- Código en inglés, textos UI en castellano.
- Docker en alguna forma.

### Lo que **NO** hay que escribir (en backend, según los enunciados)

- `pom.xml` (se asume).
- `application.properties` (se asume).
- Clase `Application` (se asume).
- Imports en ficheros Java.
- Getters/setters (se pueden dejar comentados).

### Lo que **NO** hay que escribir (en frontend, según los enunciados)

- Configuración base del proyecto (`index.html`, `angular.cli`/`vite.config`,
  `package.json`, `tsconfig.json`, `app.module.ts`/`main.tsx`, etc.).
- Imports en ficheros TS/JS.

### Tendencia 2026 (predicción)

El examen de 2026 será **muy probablemente**:
- API REST pura con DTOs (como Mayo y Junio 2025).
- Frontend SPA en **React** (sustituye a Angular).
- Docker Compose (como 2025).
- 2p backend + 2.5p frontend + 1.5p Docker = 6p totales.

CC debe trabajar **asumiendo este formato** salvo evidencia en contra.

---

## 4. Decisiones técnicas para el frontend React

> Estas decisiones aplican a TODAS las plantillas, exámenes resueltos y
> simulacros que se generen.

### A. Estilos y componentes: **HTML plano puro**

- Solo etiquetas HTML estándar: `<div>`, `<button>`, `<input>`, `<form>`,
  `<ul>`, `<li>`, `<a>`, `<h1>`, etc.
- **NO usar `react-bootstrap`** (aunque el ejemplo del profe lo use).
- **NO usar clases CSS** (`className="..."`).
- **NO usar librerías de UI** (Material UI, Chakra, etc.).
- Justificación: los enunciados del examen lo prohíben explícitamente.

### B. Lenguaje del frontend: **JavaScript (`.jsx`)** *[decisión por defecto]*

- Ficheros `.jsx`, no `.tsx`.
- Sin tipos TypeScript, sin `interface`, sin `as`, sin `<TipoGenérico>`.
- Justificación: menos código que memorizar, menos errores en 90 min,
  los enunciados no exigen TS.

> **🔍 INSTRUCCIÓN PARA CC:**
> Antes de la **Fase 2**, leer todos los PDFs de `Teoria-React/`.
> Si en la teoría el profesor enseña **TypeScript de forma explícita y exclusiva**
> (no solo lo menciona, sino que TODOS los ejemplos están en TS), entonces
> **cambiar la decisión a TypeScript** y avisar al estudiante en el chat antes
> de generar las plantillas. En cualquier otro caso, mantener JavaScript.

### C. Routing: **React Router en "library mode"** *[decisión por defecto]*

- Sintaxis JSX: `<BrowserRouter>`, `<Routes>`, `<Route path=... element=... />`.
- **NO** usar React Router framework mode (`routes.ts`, `clientLoader`,
  `Route.ComponentProps`), aunque el ejemplo del profe lo use.
- Justificación: equivalencia casi 1-a-1 con `app.routing.ts` de Angular,
  más sencillo de memorizar.

> **🔍 INSTRUCCIÓN PARA CC:**
> En `Teoria-React/` debe existir un PDF específico sobre routing.
> Antes de la **Fase 2**, leerlo. Si el profesor enseña **explícitamente
> framework mode** (con `routes.ts` y `clientLoader`), cambiar la decisión a
> framework mode y avisar al estudiante. Si enseña library mode, o si no es
> claro, mantener library mode.

### D. Estado global: **`useState` local + (opcional) Zustand**

- Por defecto, todo el estado en `useState` dentro de cada componente.
- Solo si el ejercicio requiere autenticación o estado compartido entre
  rutas, usar **Zustand** (como el ejemplo del profe).

### E. Llamadas a la API: **`fetch` nativo en un service**

- Crear un fichero `services/<entidad>-service.js` con funciones
  `getX()`, `getXById()`, `createX()`, `updateX()`, `deleteX()`.
- Usar `fetch` con URLs relativas (`/api/...`), asumiendo proxy configurado.
- Esto coincide con el ejemplo del profe (`books-service.ts`).

### F. Autenticación: **incluir snippets pero solo aplicar si el enunciado lo pide**

- Crear plantillas para:
  - Auth con cookies/sesión + Zustand (estilo `ejemplo-practica3`).
  - Auth simplificado con login básico y comprobación de rol.
  - Protección de rutas (`<RequireAuth>` wrapper).
- Aplicarlos solo cuando el enunciado mencione roles, login, usuarios.

---

## 5. Decisiones técnicas para el backend Spring

(Sin cambios respecto a 2025. El estudiante ya domina esto, pero las
plantillas hay que generarlas igualmente para tener una referencia rápida.)

- Spring Boot + SpringData JPA.
- Estructura: `model/`, `repository/`, `service/`, `controller/`, `dto/`.
- DTOs con `record` (Java moderno), Mapper asumido (no hay que escribirlo).
- API REST: URLs en plural (`/api/ads/`, `/api/ads/{id}`), métodos HTTP
  correctos, códigos de estado (`200`, `201`, `204`, `404`, `409`).
- WebSecurityConfig solo si hay auth.

---

## 6. Decisiones técnicas para Docker

Hay **dos formatos** que pueden caer:

- **Dockerfile multistage + script** (formato 2023, 2024).
  - Multistage: build con `maven` o `node`, runtime con `openjdk-jre` o `nginx`.
  - Script `build.sh` con `docker build` + `docker push`.
- **Docker Compose** (formato 2025, más probable en 2026).
  - `docker-compose.yaml` con servicio web + servicio mysql.
  - Variables de entorno `SPRING_DATASOURCE_*`, `MYSQL_*`.
  - `restart: always` o `restart: on-failure`.

CC debe generar plantillas para **ambos formatos**.

---

## 7. Plan de entrega en fases

> Cada fase es independiente. Yo le diré a CC qué fase ejecutar.
> Antes de empezar cada fase, CC debe confirmar las decisiones de §4 (en
> particular B y C, leyendo `Teoria-React/`).

### Fase 1 — Análisis y método

Generar:

- `00-analisis-patrones.md` — qué se repite siempre en los 5 exámenes,
  estructura típica, qué pide cada apartado, distribución de puntos.
- `01-metodologia-90min.md` — plan de ataque sistemático paso a paso:
  - 0–5 min: leer enunciado y dibujar el modelo.
  - 5–35 min: backend.
  - 35–75 min: frontend React.
  - 75–85 min: docker.
  - 85–90 min: empaquetar ZIP.
- `02-checklist-90min.md` — checklist final de entrega:
  estructura de carpetas, nombre del ZIP, ficheros mínimos, qué NO escribir.

### Fase 2 — Plantillas memorizables

⚠️ **Antes de empezar, CC DEBE leer `Teoria-React/` y `Codigo-React/`** para
confirmar B y C. Si hay que cambiar las decisiones, avisar al estudiante
en el chat antes de generar nada.

Generar:

- `03-plantillas-backend-spring.md` — Entity, Repository, Service,
  RestController, DTO, WebSecurityConfig.
- `04-plantillas-react.md` — App con Router, componente lista,
  componente detalle, componente formulario, service con fetch, auth
  completa, auth simplificada.
- `05-plantillas-docker.md` — Dockerfile multistage para Spring + frontend
  estático, Dockerfile NGINX para SPA, Docker Compose con MySQL,
  script `build.sh`.

Cada plantilla debe incluir:
- **Cuándo se usa** (qué pide el enunciado para que la apliques).
- **Código completo** copiable y memorizable.
- **Variantes** según contexto (con/sin auth, con/sin imagen, etc.).
- **Errores comunes** y cómo evitarlos.
- **Comentarios** que expliquen cada parte (porque parto de cero en React).

### Fase 3 — Aprendizaje React desde cero

Generar:

- `06-react-desde-cero.md` — tutorial mínimo y aplicado al examen:
  - Qué es JSX y cómo se lee.
  - Componentes funcionales y `export default`.
  - `useState` con ejemplos.
  - `useEffect` con ejemplos (sobre todo `[]` para "al cargar").
  - Props.
  - Renderizado condicional (`{x && <Y />}`, ternario).
  - Listas con `.map()` y `key`.
  - Manejo de eventos (`onClick`, `onSubmit`, `onChange`).
  - Formularios controlados.
  - Navegación con `useNavigate` y `<Link>`.
  - Carga de parámetros con `useParams`.
  - Llamadas a la API con `fetch` dentro de `useEffect`.
- `07-equivalencias-angular-react.md` — tabla comparativa:
  - Componente Angular ↔ función React.
  - `*ngIf` ↔ `{x && ...}`.
  - `*ngFor` ↔ `.map()`.
  - `[(ngModel)]` ↔ `value` + `onChange`.
  - `(click)` ↔ `onClick`.
  - Service Angular ↔ módulo JS con `export`.
  - `app.routing.ts` ↔ `<BrowserRouter><Routes>...`.
  - `HttpClient` ↔ `fetch`.
  - `Router.navigate` ↔ `useNavigate()`.
  - `ActivatedRoute.params` ↔ `useParams()`.

### Fase 4 — Resolución de los 5 exámenes anteriores con frontend en React

Para cada examen, generar una carpeta:

```
examenes-resueltos/
├── 2023-junio-tiempos/
│   ├── README.md       ← resumen del enunciado, qué pide cada apartado
│   ├── backend/        ← solución backend (revisión, no se traduce)
│   ├── frontend/       ← traducción de Angular → React
│   └── docker/         ← solución docker
├── 2024-mayo-marvel-pop-paradise/
├── 2024-junio-harleydawson/
├── 2025-mayo-fotosdaw/
└── 2025-junio-ludomaniacos/
```

Importante:
- **Solo traducir la parte de Angular → React.** El backend y docker se
  copian/revisan de la solución del profesor.
- Aplicar las decisiones de §4 (HTML plano, JS, library mode, etc.).
- Comentar el código React línea por línea las primeras veces, porque
  parto de cero.
- Para los exámenes 2023 y 2024 que pedían MVC + SPA, **ignorar la parte
  MVC** (no caerá en 2026) y traducir solo la SPA a React.

### Fase 5 — Simulacro 2026

Generar:

- `simulacro-2026/enunciado.md` — examen inventado por CC siguiendo los
  patrones detectados (formato 2025: API REST + SPA + Docker Compose).
  Dominio nuevo distinto a los 5 anteriores (sugerencia: gestión de
  reservas de pistas de pádel, biblioteca de cómics, panel de ofertas
  laborales, etc.).
- `simulacro-2026/solucion/`:
  - `backend/` — solución completa.
  - `frontend/` — solución completa en React siguiendo §4.
  - `docker/` — solución completa.
- `simulacro-2026/solucion-comentada.md` — explicación paso a paso de
  cómo abordaría el examen real desde 0 hasta 90 min usando esta solución.

---

## 8. Convenciones para el código generado

- **Inglés en código** (nombres de variables, clases, métodos).
- **Castellano en textos UI** (botones, mensajes de error que ve el usuario).
- Comentarios pedagógicos en español, explicando el "por qué", no el "qué"
  (que ya se ve en el código).
- En backend Java:
  - No incluir imports.
  - No implementar getters/setters (poner `// getters and setters`).
  - Usar `record` para DTOs.
- En frontend React:
  - No incluir imports (los enunciados lo permiten).
  - Sin clases CSS, sin estilos.
  - Componentes funcionales con `export default function X() { ... }`.
- En Docker:
  - Indentación con 2 espacios en YAML.
  - Versiones tal y como las indica el enunciado.

---

## 9. Cómo invocar las fases (para el estudiante)

Cada fase se le pide a CC explícitamente, una a una:

```
Ejecuta la Fase 1 del CLAUDE.md
Ejecuta la Fase 2 del CLAUDE.md
Ejecuta la Fase 3 del CLAUDE.md
Ejecuta la Fase 4 del CLAUDE.md, examen 2025-junio-ludomaniacos
Ejecuta la Fase 5 del CLAUDE.md
```

Antes de cada fase, CC debe:
1. Releer este CLAUDE.md.
2. Si la fase implica React (2, 3, 4, 5), releer `Teoria-React/` y
   `Codigo-React/` para confirmar las decisiones B y C.
3. Si alguna decisión cambia, avisar al estudiante en el chat **antes** de
   generar nada y esperar confirmación.
4. Generar los ficheros de la fase.
5. Al terminar, hacer un resumen de qué se generó y qué quedaría para la
   siguiente fase.

---

## 10. Resumen ejecutivo (TL;DR para CC)

- Ayudar a un estudiante a aprobar un examen DAW de 90 min, 4/6 para aprobar.
- El código NO tiene que compilar.
- Frontend: React **HTML plano + JavaScript + library mode** (verificar contra `Teoria-React/`).
- Backend: Spring Boot + JPA + DTOs (estilo 2025).
- Docker: Compose (probable en 2026) y multistage (por si acaso).
- Formato: backend/, frontend/, docker/, ZIP con iniciales.
- Trabajar en **5 fases** ejecutadas a demanda del estudiante.
- Antes de cada fase de React, **leer `Teoria-React/`** y avisar si hay que
  cambiar las decisiones por defecto.
