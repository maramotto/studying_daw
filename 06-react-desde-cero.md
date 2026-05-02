# 06 — React desde Cero (para el examen)

> Fase 3 del plan de estudio. Tutorial mínimo pensado para alguien que
> **nunca ha tocado React** pero ya sabe Angular, Spring Boot y TypeScript.
>
> Solo se explica lo que necesitas para el examen. Nada más.
> Cada concepto incluye la comparación con Angular para que lo entiendas
> al instante.

---

## Índice

1. [Qué es React y en qué se diferencia de Angular](#1-qué-es-react)
2. [JSX: HTML dentro de TypeScript](#2-jsx)
3. [Componentes funcionales](#3-componentes-funcionales)
4. [useState: el estado del componente](#4-usestate)
5. [Renderizado condicional](#5-renderizado-condicional)
6. [Listas con .map()](#6-listas-con-map)
7. [Eventos](#7-eventos)
8. [Formularios controlados](#8-formularios-controlados)
9. [Formularios con useActionState](#9-formularios-con-useactionstate)
10. [useEffect: hacer algo al cargar](#10-useeffect)
11. [clientLoader: cargar datos antes de renderizar](#11-clientloader)
12. [Navegación: useNavigate y Link](#12-navegación)
13. [Parámetros de ruta: useParams](#13-parámetros-de-ruta)
14. [Llamadas a la API con fetch](#14-llamadas-a-la-api)
15. [Routing con routes.ts (framework mode)](#15-routing)
16. [Props: pasar datos entre componentes](#16-props)
17. [Outlet: el router-outlet de React](#17-outlet)
18. [Resumen: flujo mental para escribir un componente](#18-resumen)

---

## 1. Qué es React

En Angular tienes una **arquitectura completa**: módulos, componentes con decorator,
templates HTML separados, services con inyección de dependencias, routing con módulo
dedicado, CLI que genera todo...

React es **solo la librería de UI**. Todo lo demás (routing, estado global, etc.) son
paquetes separados. Pero en el examen, lo que necesitas saber es mínimo:

| Angular | React |
|---|---|
| Framework completo | Librería de UI + paquetes |
| Template HTML separado (`.html`) | JSX dentro del archivo `.tsx` |
| Clases con decoradores | Funciones que devuelven JSX |
| Inyección de dependencias | Importar y usar funciones directamente |
| Two-way binding (`ngModel`) | One-way: `value` + `onChange` |
| Observables (RxJS) | Promesas (`async/await`) |

**Lo importante:** en React, un componente es **una función que devuelve HTML**.
Nada más. No hay clases, no hay decoradores, no hay módulos.

---

## 2. JSX

JSX es HTML escrito directamente dentro de TypeScript. Es lo que devuelve cada
componente.

```tsx
// Esto es JSX válido
function MiComponente() {
    const nombre = "Mara";
    return (
        <div>
            <h1>Hola, {nombre}</h1>
            <p>2 + 2 = {2 + 2}</p>
        </div>
    );
}
```

### Reglas de JSX que debes saber

1. **Las llaves `{}` ejecutan JavaScript** dentro del HTML:
   ```tsx
   <p>El precio es: {game.price}</p>
   <p>Con descuento: {game.price * 0.8}</p>
   ```

2. **Solo puede haber UN elemento raíz** en el return:
   ```tsx
   // MAL: dos elementos raíz
   return (
       <h1>Título</h1>
       <p>Texto</p>
   );

   // BIEN: envuelto en un <div> (o en <> </>)
   return (
       <div>
           <h1>Título</h1>
           <p>Texto</p>
       </div>
   );
   ```

3. **`class` se escribe `className`** (porque `class` es palabra reservada en JS).
   Pero en el examen no usamos CSS, así que no lo necesitas.

4. **Atributos HTML en camelCase**: `onclick` → `onClick`, `onsubmit` → `onSubmit`.

5. **`style` usa un objeto**, no un string:
   ```tsx
   // HTML normal:  style="color: red; text-decoration: line-through"
   // JSX:
   <span style={{ color: "red", textDecoration: "line-through" }}>Tachado</span>
   ```
   > Las dobles llaves: la exterior es "aquí va JS", la interior es "esto es un objeto".

---

## 3. Componentes funcionales

Un componente React es una función que empieza con mayúscula y devuelve JSX.

```tsx
// Angular: @Component({ selector: 'app-header', templateUrl: 'header.component.html' })
//          export class HeaderComponent { ... }

// React:
export default function Header() {
    return <h1>Mi Aplicación</h1>;
}
```

### Reglas
- El nombre **SIEMPRE** empieza con mayúscula: `GamesList`, no `gamesList`.
- Se exporta con `export default function`.
- No hay archivos separados para template y componente — todo va en el `.tsx`.
- No hay `@Component`, ni `selector`, ni `templateUrl`.

---

## 4. useState

`useState` es cómo React sabe que un dato ha cambiado y debe re-renderizar.

```tsx
// Angular: en la clase defines    nombre: string = "valor";
//          y cambias con           this.nombre = "otro valor";

// React:
import { useState } from "react";

function Contador() {
    const [count, setCount] = useState(0);
    //      ↑          ↑                ↑
    //   valor     función para      valor
    //   actual    cambiarlo         inicial

    return (
        <div>
            <p>Has clicado {count} veces</p>
            <button onClick={() => setCount(count + 1)}>
                Incrementar
            </button>
        </div>
    );
}
```

### Con tipos (TypeScript)
```tsx
const [name, setName] = useState("");              // string inferido
const [price, setPrice] = useState(0);             // number inferido
const [games, setGames] = useState<Game[]>([]);    // array de Game (tipo explícito)
const [game, setGame] = useState<Game | null>(null); // Game o null
```

### Regla de oro
**NUNCA modifiques el estado directamente.** Siempre usa la función `set...`:
```tsx
// MAL:  games.push(nuevoJuego);
// BIEN: setGames([...games, nuevoJuego]);

// MAL:  game.name = "otro";
// BIEN: setGame({ ...game, name: "otro" });
```

> El `...` (spread) crea una copia del objeto/array con la modificación.
> Esto es porque React compara "¿es el mismo objeto?" para decidir si
> re-renderizar. Si mutas el original, React no se entera.

---

## 5. Renderizado condicional

En Angular usas directivas (`*ngIf`). En React usas JavaScript puro:

### Mostrar algo solo si se cumple una condición
```tsx
// Angular: <span *ngIf="game.discount">En oferta</span>
// React:
{game.discount && <span>En oferta</span>}
```

> Cómo funciona: `&&` evalúa la izquierda. Si es `true`, devuelve la derecha.
> Si es `false`, no renderiza nada.

### Mostrar una cosa u otra
```tsx
// Angular: <span *ngIf="game.discount; else sinOferta">Oferta</span>
//          <ng-template #sinOferta>Normal</ng-template>
// React:
{game.discount ? <span>Oferta</span> : <span>Normal</span>}
```

### Mostrar estado de carga
```tsx
if (!game) return <p>Cargando...</p>;

return <h1>{game.name}</h1>;
```

> El `return` temprano es el patrón más simple para "loading".

### Ocultar un botón según estado
```tsx
// Angular: <button *ngIf="!ad.rented" (click)="rent()">Alquilar</button>
//          <button *ngIf="ad.rented" (click)="stopRent()">Finalizar</button>
// React:
{!ad.rented && <button onClick={handleRent}>Alquilar</button>}
{ad.rented && <button onClick={handleStopRent}>Finalizar Alquiler</button>}
```

---

## 6. Listas con .map()

En Angular usas `*ngFor`. En React usas `.map()` de JavaScript:

```tsx
// Angular:
// <li *ngFor="let game of games">{{ game.name }}</li>

// React:
<ul>
    {games.map(game => (
        <li key={game.id}>{game.name}</li>
    ))}
</ul>
```

### `key` es OBLIGATORIO
React necesita un `key` único en cada elemento de la lista para saber
cuál es cuál al re-renderizar. Siempre usa `key={item.id}`.

### Con Link al detalle
```tsx
<ul>
    {games.map(game => (
        <li key={game.id}>
            <Link to={`/game/${game.id}`}>{game.name}</Link>
            - Precio: {game.price}
        </li>
    ))}
</ul>
```

### Filtrar + mapear
```tsx
// Mostrar solo los que cuestan > 100
{games.filter(g => g.price > 100).map(game => (
    <li key={game.id}>{game.name}</li>
))}
```

---

## 7. Eventos

```tsx
// Angular: (click)="metodo()"
// React:   onClick={metodo}  o  onClick={() => metodo()}

<button onClick={handleDelete}>Eliminar</button>
<button onClick={() => handleBuy(game.id)}>Comprar</button>
```

### Definir el handler
```tsx
function handleDelete() {
    // lógica
}

// O como async si llama a la API:
async function handleDelete() {
    await removeGame(game.id);
    navigate("/");
}
```

### Prevenir comportamiento por defecto (formularios)
```tsx
// Angular: (submit)="onSubmit($event)"  →  event.preventDefault()
// React: onSubmit con preventDefault
<form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
```

> Con `useActionState` (ver sección 9), no necesitas `preventDefault`
> porque el form usa `action={formAction}` en vez de `onSubmit`.

---

## 8. Formularios controlados (patrón clásico)

En Angular tienes `[(ngModel)]` que hace two-way binding.
En React, cada campo tiene un `useState` y se conecta manualmente:

```tsx
function GameForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    async function handleSubmit() {
        await createGame(name, price, 0, false);
        // limpiar formulario
        setName("");
        setPrice(0);
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <label>Nombre: </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Precio: </label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />

            <button type="submit">Crear</button>
        </form>
    );
}
```

### Equivalencia campo a campo

| Angular | React |
|---|---|
| `<input [(ngModel)]="name">` | `<input value={name} onChange={e => setName(e.target.value)} />` |
| `<input [(ngModel)]="price" type="number">` | `<input value={price} onChange={e => setPrice(Number(e.target.value))} type="number" />` |
| `<input [(ngModel)]="discount" type="checkbox">` | `<input checked={discount} onChange={e => setDiscount(e.target.checked)} type="checkbox" />` |

> `e.target.value` siempre es string. Para numbers, envolver con `Number(...)`.
> Para checkboxes, usar `e.target.checked` (booleano).

---

## 9. Formularios con useActionState (patrón del profesor)

`useActionState` es un hook de React 19 que el profesor usa en los ejemplos.
Es más limpio que el patrón clásico porque no necesitas un `useState` por campo:

```tsx
import { useActionState } from "react";

export default function GameNew() {
    const navigate = useNavigate();

    // Función que se ejecuta al enviar el formulario
    async function handleCreate(
        prevState: { error: string | null },   // estado anterior
        formData: FormData                      // datos del formulario
    ) {
        // Extraer valores de los campos por su atributo "name"
        const name = formData.get("name") as string;
        const price = Number(formData.get("price"));

        try {
            await createGame(name, price, 0, false);
            navigate("/");
            return { error: null };
        } catch (e) {
            return { error: "Ya existe un juego con ese nombre" };
        }
    }

    // useActionState devuelve: [estado, acción, isPending]
    const [state, formAction, isPending] = useActionState(
        handleCreate,
        { error: null }   // estado inicial
    );

    return (
        <form action={formAction}>
            <label>Nombre: </label>
            <input type="text" name="name" required disabled={isPending} />

            <label>Precio: </label>
            <input type="number" name="price" required disabled={isPending} />

            {state.error && <p style={{color: "red"}}>{state.error}</p>}

            <button type="submit" disabled={isPending}>
                {isPending ? "Creando..." : "Crear juego"}
            </button>
        </form>
    );
}
```

### ¿Cómo funciona?
1. El `<form>` usa `action={formAction}` en vez de `onSubmit`.
2. Al enviar, React llama a `handleCreate` con un `FormData` que contiene
   los valores de todos los `<input>` que tengan atributo `name`.
3. `formData.get("name")` devuelve el valor del `<input name="name">`.
4. `isPending` es `true` mientras se ejecuta la acción (para deshabilitar botones).
5. El `state` se actualiza con lo que devuelve `handleCreate` (para mostrar errores).

### ¿Cuándo usar cada patrón?

| Patrón | Cuándo |
|---|---|
| `useActionState` + `FormData` | Formularios de crear/editar (el profesor lo prefiere) |
| `useState` + `onChange` | Cuando necesitas leer el valor durante la escritura (filtros, validación en vivo) |

> **Para el examen:** si te acuerdas de `useActionState`, úsalo. Si no,
> el patrón clásico con `useState` + `onChange` es igualmente correcto.

---

## 10. useEffect

`useEffect` ejecuta código cuando el componente se monta o cuando algo cambia.

```tsx
import { useState, useEffect } from "react";

function GamesList() {
    const [games, setGames] = useState<Game[]>([]);

    // Ejecutar UNA vez al montar el componente (como ngOnInit)
    useEffect(() => {
        loadGames();
    }, []);   // ← array vacío = solo al montar

    async function loadGames() {
        const data = await getGames();
        setGames(data);
    }

    return (
        <ul>
            {games.map(g => <li key={g.id}>{g.name}</li>)}
        </ul>
    );
}
```

### Los tres casos del array de dependencias

```tsx
useEffect(() => { ... }, []);      // Solo al montar (ngOnInit)
useEffect(() => { ... }, [id]);    // Al montar Y cuando "id" cambie
useEffect(() => { ... });          // En CADA render (CASI NUNCA quieres esto)
```

> **Regla para el examen:** siempre pon `[]` salvo que necesites
> reaccionar a un cambio de parámetro (como `[id]` en el detalle).

---

## 11. clientLoader

`clientLoader` es la alternativa del profesor a `useEffect` para cargar datos.
Se ejecuta **ANTES** de que el componente se renderice.

```tsx
import type { Route } from "./+types/games-list";
import { getGames } from "~/services/games-service";

// Esta función se ejecuta antes de renderizar el componente
export async function clientLoader() {
    return await getGames();
}

// Los datos llegan como prop "loaderData"
export default function GamesList({ loaderData }: Route.ComponentProps) {
    const games = loaderData;

    return (
        <ul>
            {games.map(g => <li key={g.id}>{g.name}</li>)}
        </ul>
    );
}
```

### Con parámetro de ruta (para el detalle)
```tsx
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return await getGame(params.id!);
    //                         ↑ params.id viene de la ruta "game/:id"
    //                           el ! dice "confía, no es null"
}
```

### ¿clientLoader o useEffect?

| clientLoader | useEffect |
|---|---|
| Los datos están listos al renderizar | Hay un momento de "cargando" |
| Menos código (no necesitas useState) | Más código (useState + useEffect) |
| Es lo que enseña el profesor | Es el patrón universal de React |
| Solo funciona en framework mode | Funciona siempre |

> **Ambos son válidos en el examen.** `clientLoader` es más corto.

---

## 12. Navegación

### Navegar por código (equivale a `this.router.navigate` en Angular)
```tsx
import { useNavigate } from "react-router";

function GameDetail() {
    const navigate = useNavigate();

    async function handleDelete() {
        await removeGame(game.id);
        navigate("/");            // ir a la lista
    }

    return <button onClick={handleDelete}>Eliminar</button>;
}
```

### Links (equivale a `[routerLink]` en Angular)
```tsx
import { Link } from "react-router";

// Angular: <a [routerLink]="['/game', game.id]">{{ game.name }}</a>
// React:
<Link to={`/game/${game.id}`}>{game.name}</Link>

// Ruta simple:
<Link to="/">Volver</Link>
```

---

## 13. Parámetros de ruta

### Con clientLoader (patrón del profesor)
```tsx
// La ruta está definida como: route("game/:id", ...)
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const game = await getGame(params.id!);  // params.id = el valor de :id
    return game;
}
```

### Con useParams (patrón clásico)
```tsx
import { useParams } from "react-router";

function GameDetail() {
    const { id } = useParams();    // extrae :id de la URL

    useEffect(() => {
        getGame(id!).then(g => setGame(g));
    }, [id]);
}
```

---

## 14. Llamadas a la API con fetch

En Angular usas `HttpClient` que devuelve Observables.
En React usas `fetch` que devuelve Promises.

### GET
```tsx
const res = await fetch("/api/games/");
const games = await res.json();    // parsear JSON
```

### POST
```tsx
const res = await fetch("/api/games/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, stock, discount }),
});
if (!res.ok) throw new Error("Error");
const newGame = await res.json();
```

### PUT
```tsx
const res = await fetch(`/api/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, stock, discount }),
});
```

### DELETE
```tsx
const res = await fetch(`/api/games/${id}`, {
    method: "DELETE",
});
```

### Patrón: siempre en un service separado
No pongas `fetch` directamente en el componente. Crea un fichero
`services/games-service.ts` con funciones exportadas (ver plantilla 04).

---

## 15. Routing con routes.ts (framework mode)

En Angular defines las rutas en un array `Routes` dentro de `app.routing.ts`.
En React (framework mode), las defines en `routes.ts`:

```ts
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [         // layout = componente que envuelve
        index("routes/games-list.tsx"), // index = ruta raíz "/"
        route("game/:id", "routes/game-detail.tsx"),  // ruta con parámetro
    ]),
] satisfies RouteConfig;
```

### Equivalencia

| Angular | React framework mode |
|---|---|
| `{ path: '', component: GamesComponent }` | `index("routes/games-list.tsx")` |
| `{ path: 'game/:id', component: GameComponent }` | `route("game/:id", "routes/game-detail.tsx")` |
| Componente con `<router-outlet>` | `layout("routes/home.tsx", [...])` con `<Outlet />` |

---

## 16. Props

Props es cómo pasas datos de un componente padre a un componente hijo.

```tsx
// Angular: @Input() title: string;
//          <app-header [title]="'Mi App'"></app-header>

// React: los props son argumentos de la función
function Header({ title }: { title: string }) {
    return <h1>{title}</h1>;
}

// Uso:
<Header title="Mi App" />
```

### Props con callback (equivale a @Output en Angular)
```tsx
function DeleteButton({ onDelete }: { onDelete: () => void }) {
    return <button onClick={onDelete}>Eliminar</button>;
}

// Uso:
<DeleteButton onDelete={() => handleDelete(game.id)} />
```

> En el examen, probablemente no necesites extraer subcomponentes.
> Todo puede ir en un solo componente por página. Pero es bueno
> entender props por si necesitas leer el código del profesor.

---

## 17. Outlet

`<Outlet />` es exactamente como `<router-outlet>` en Angular.
Se pone en el componente layout y ahí se renderiza la página hija:

```tsx
// home.tsx (layout)
import { Outlet } from "react-router";

export default function Home() {
    return (
        <div>
            <h1>Ludomaniacos</h1>
            <Outlet />       {/* Aquí aparece games-list, game-detail, etc. */}
        </div>
    );
}
```

---

## 18. Resumen: flujo mental para escribir un componente

Cuando el enunciado describe una página, sigue este orden mental:

### 1. ¿Qué datos necesito?
→ `clientLoader` que llama al service, o `useEffect` + `useState`

### 2. ¿Qué acciones tiene? (botones, formulario)
→ Funciones `async` que llaman al service + `navigate` o `setEstado`

### 3. ¿Qué muestra?
→ JSX con `{datos.map(...)}`, `{condicion && ...}`, `<Link to={...}>`

### Ejemplo mental para "página de detalle de un juego":

```
Datos:     clientLoader → getGame(params.id)
Acciones:  handleDelete → removeGame(id) → navigate("/")
           handleBuy    → updateGame(..., stock-1) → recargar
           handleOffer  → updateGame(..., discount=true) → recargar
Muestra:   nombre, precio, stock, botones
Condicional: stock < 3 → "Últimas unidades" en rojo
             discount → mostrar precio con descuento
```

Tradúcelo directamente a código:

```tsx
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return await getGame(params.id!);
}

export default function GameDetail({ loaderData }: Route.ComponentProps) {
    const game = loaderData;
    const navigate = useNavigate();

    async function handleDelete() { /* ... */ }
    async function handleBuy() { /* ... */ }

    return (
        <div>
            <h2>{game.name} {game.stock < 3 && <span style={{color:"red"}}>Últimas unidades</span>}</h2>
            <p>Precio: {game.price}</p>
            {game.discount && <p>Oferta: {game.price * 0.8}</p>}
            <button onClick={handleDelete}>Eliminar</button>
            <button onClick={handleBuy}>Comprar</button>
        </div>
    );
}
```

> Este es el patrón que se repite en todos los exámenes.
> Cambia la entidad, cambian los campos, cambian los botones.
> La estructura es siempre la misma.
