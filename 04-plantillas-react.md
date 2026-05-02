# 04 — Plantillas Frontend React (TypeScript + Framework Mode)

> Fase 2 del plan de estudio. Plantillas memorizables para el examen.
> Decisiones confirmadas tras leer `Teoria-React/`:
> - **TypeScript** (`.tsx` / `.ts`) — el profesor lo enseña exclusivamente.
> - **React Router framework mode** — `routes.ts`, `clientLoader`, `Route.ComponentProps`.
> - **HTML plano** — sin librerías CSS, sin `className`.
> - Sin imports (el enunciado lo permite).
> - Textos UI en castellano, código en inglés.

---

## Ficheros a escribir (patrón típico)

```
frontend/
├── routes.ts                    ← configuración de rutas
├── routes/
│   ├── home.tsx                 ← layout con <Outlet> y spinner
│   ├── games-list.tsx           ← página principal: formulario + listado(s)
│   ├── game-detail.tsx          ← detalle + botones de acción
│   └── (game-new.tsx)           ← solo si formulario está en página separada
├── services/
│   └── games-service.ts         ← funciones fetch para la API
└── models/
    └── Game.ts                  ← interface TypeScript del DTO
```

> En el examen, **no escribir**: `root.tsx`, `app.css`, `package.json`,
> `vite.config.ts`, `tsconfig.json`, `react-router.config.ts`.

---

## Conceptos clave de React (para alguien que viene de Angular)

Antes de las plantillas, estos son los bloques fundamentales que necesitas entender:

### JSX = HTML dentro de JavaScript
```tsx
// En Angular escribes HTML en un fichero aparte (.html)
// En React escribes HTML directamente en la función, dentro de return()
function MiComponente() {
    return <h1>Hola mundo</h1>;
}
```

### useState = variable que al cambiar re-renderiza el componente
```tsx
// Angular: this.nombre = "valor" y el template se actualiza
// React: necesitas useState para que React sepa que algo cambió
const [nombre, setNombre] = useState("valor");
// nombre = valor actual, setNombre = función para cambiarlo
// Cuando llamas setNombre("otro"), React re-renderiza el componente
```

### useEffect = "al cargar el componente, haz esto"
```tsx
// Angular: ngOnInit()
// React: useEffect con array vacío []
useEffect(() => {
    // esto se ejecuta UNA vez al montar el componente
    fetchDatos();
}, []);  // [] = solo al montar. SIN [] = en cada render (MAL)
```

### clientLoader = alternativa del profesor a useEffect (framework mode)
```tsx
// El profesor prefiere clientLoader para cargar datos:
// Se ejecuta ANTES de renderizar el componente
export async function clientLoader() {
    return await getGames();
}
// Los datos llegan como prop:
export default function GamesList({ loaderData }: Route.ComponentProps) {
    const games = loaderData;
    // ...
}
```

### Renderizado condicional
```tsx
// Angular: *ngIf="condicion"
// React: {condicion && <JSX>}
{game.discount && <span>En oferta</span>}

// Angular: *ngIf="condicion; else otroBloque"
// React: ternario
{game.discount ? <span>Oferta</span> : <span>Normal</span>}
```

### Listas con .map()
```tsx
// Angular: *ngFor="let game of games"
// React: .map() con key obligatorio
{games.map(game => (
    <li key={game.id}>{game.name}</li>
))}
```

### Eventos
```tsx
// Angular: (click)="metodo()"
// React: onClick={funcion}
<button onClick={() => handleDelete()}>Eliminar</button>
<button onClick={handleDelete}>Eliminar</button>  // equivalente si no hay params
```

### Navegación
```tsx
// Angular: this.router.navigate(['/game', id])
// React: useNavigate()
const navigate = useNavigate();
navigate(`/game/${id}`);
navigate("/"); // volver a la lista
```

### Links
```tsx
// Angular: [routerLink]="['/game', game.id]"
// React: <Link to={...}>
<Link to={`/game/${game.id}`}>{game.name}</Link>
```

### Parámetros de ruta
```tsx
// Angular: this.activatedRoute.snapshot.params["id"]
// React: useParams()
const { id } = useParams();
```

---

## 1. Interface del DTO — `models/Game.ts`

### Cuándo se usa
Siempre. Define la forma de los datos que vienen de la API.

### Plantilla

```ts
export default interface Game {
    id: number;
    name: string;
    price: number;
    stock: number;
    discount: boolean;
}
```

> Los campos deben coincidir con el DTO del backend (GameDTO.java).
> El profesor usa `string` para el id en su ejemplo, pero en los exámenes
> el backend usa `Long` → en el frontend es `number`.

---

## 2. Service — `services/games-service.ts`

### Cuándo se usa
Siempre. Es el equivalente al `HttpClient` service de Angular.

### Plantilla completa

```ts
import type Game from "~/models/Game";

const API_URL = "/api/games";

// Obtener lista (con filtro opcional)
export async function getGames(discount: boolean): Promise<Game[]> {
    const res = await fetch(`${API_URL}/?discount=${discount}`);
    return await res.json();
}

// Obtener por id
export async function getGame(id: string): Promise<Game> {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Not found");
    return await res.json();
}

// Crear
export async function createGame(name: string, price: number,
        stock: number, discount: boolean): Promise<Game> {
    const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock, discount }),
    });
    if (!res.ok) throw new Error("Error");
    return await res.json();
}

// Actualizar (PUT)
export async function updateGame(id: number, name: string, price: number,
        stock: number, discount: boolean): Promise<Game> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock, discount }),
    });
    if (!res.ok) throw new Error("Error");
    return await res.json();
}

// Eliminar
export async function removeGame(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error");
}
```

### Variante: sin filtro (lista simple)
```ts
export async function getGames(): Promise<Game[]> {
    const res = await fetch(`${API_URL}/`);
    return await res.json();
}
```

### Patrón memorizable
Todas las funciones siguen el mismo esquema:
1. `fetch(url, opciones)` → `res`
2. POST/PUT: añadir `method`, `headers`, `body: JSON.stringify(...)`
3. Verificar `res.ok` (excepto GET lista que siempre devuelve 200)
4. `return await res.json()` (excepto DELETE que no devuelve nada útil)

### Errores comunes
- Olvidar `Content-Type: application/json` en POST/PUT → el backend no parsea el body.
- Olvidar la `/` final en la URL base si el backend la espera.
- No verificar `res.ok` → los errores se silencian.

---

## 3. Configuración de rutas — `routes.ts`

### Cuándo se usa
Siempre. Es el equivalente a `app.routing.ts` de Angular.

### Plantilla

```ts
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [
        index("routes/games-list.tsx"),
        route("game/:id", "routes/game-detail.tsx"),
    ]),
] satisfies RouteConfig;
```

### Equivalencia con Angular

| Angular (`app.routing.ts`) | React (`routes.ts`) |
|---|---|
| `{ path: '', component: GamesComponent }` | `index("routes/games-list.tsx")` |
| `{ path: 'game/:id', component: GameComponent }` | `route("game/:id", "routes/game-detail.tsx")` |
| `{ path: '', redirectTo: 'games', pathMatch: 'full' }` | `index(...)` ya maneja la ruta raíz |

### Con más rutas (si hay formulario en página separada)
```ts
export default [
    layout("routes/home.tsx", [
        index("routes/games-list.tsx"),
        route("game/:id", "routes/game-detail.tsx"),
        route("game/:id/edit", "routes/game-edit.tsx"),
        route("game-new", "routes/game-new.tsx"),
    ]),
] satisfies RouteConfig;
```

### Errores comunes
- Olvidar `layout()` → las páginas no comparten el título/header.
- Olvidar `:id` en `route("game/:id", ...)` → `useParams()` no recibe el id.

---

## 4. Layout — `routes/home.tsx`

### Cuándo se usa
Siempre. Es el "contenedor" que envuelve todas las páginas.

### Plantilla

```tsx
import { Outlet, useNavigation } from "react-router";

export default function Home() {
    // useNavigation detecta si se está cargando una página nueva
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div>
            <h1>Ludomaniacos {isLoading && <span>Cargando...</span>}</h1>
            <Outlet />
        </div>
    );
}
```

> `<Outlet />` es como `<router-outlet>` en Angular: aquí se renderiza
> la página hija (games-list, game-detail, etc.).

### Variante mínima (sin spinner)
```tsx
import { Outlet } from "react-router";

export default function Home() {
    return (
        <div>
            <h1>Nombre de la App</h1>
            <Outlet />
        </div>
    );
}
```

---

## 5. Página lista + formulario — `routes/games-list.tsx`

### Cuándo se usa
Siempre. Es la página principal con el formulario de creación y los listados.

### Plantilla con clientLoader + useActionState

```tsx
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/games-list";
import { getGames, createGame } from "~/services/games-service";
import { useActionState } from "react";

// clientLoader: carga datos ANTES de renderizar (como ngOnInit)
export async function clientLoader() {
    const discounted = await getGames(true);
    const notDiscounted = await getGames(false);
    return { discounted, notDiscounted };
}

export default function GamesList({ loaderData }: Route.ComponentProps) {

    const { discounted, notDiscounted } = loaderData;
    const navigate = useNavigate();

    // useActionState para el formulario de creación
    async function handleCreate(
        prevState: { error: string | null },
        formData: FormData
    ) {
        const name = formData.get("name") as string;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));
        const discount = formData.get("discount") === "on";

        try {
            await createGame(name, price, stock, discount);
            navigate("/"); // recargar la página
            return { error: null };
        } catch (e) {
            return { error: "Ya existe un juego con ese nombre" };
        }
    }

    const [state, formAction, isPending] = useActionState(
        handleCreate, { error: null }
    );

    return (
        <div>
            {/* --- Formulario de creación --- */}
            <h2>Registrar nuevo juego</h2>
            <form action={formAction}>
                <label>Nombre: </label>
                <input type="text" name="name" required disabled={isPending} />
                <label>Precio: </label>
                <input type="number" name="price" required disabled={isPending} />
                <label>Unidades: </label>
                <input type="number" name="stock" required disabled={isPending} />
                <label>En oferta: </label>
                <input type="checkbox" name="discount" disabled={isPending} />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Registrando..." : "Registrar nuevo juego"}
                </button>
            </form>

            {state.error && <p>{state.error}</p>}

            {/* --- Listado juegos sin oferta --- */}
            <h2>Juegos</h2>
            <ul>
                {notDiscounted.map(game => (
                    <li key={game.id}>
                        <Link to={`/game/${game.id}`}>{game.name}</Link>
                        - Precio: {game.price}
                    </li>
                ))}
            </ul>

            {/* --- Listado juegos en oferta --- */}
            <h2>Juegos en oferta</h2>
            <ul>
                {discounted.map(game => (
                    <li key={game.id}>
                        <Link to={`/game/${game.id}`}>{game.name}</Link>
                        - <span style={{textDecoration: "line-through"}}>{game.price}</span>
                        - Precio oferta: {game.price * 0.8}
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

### Variante simplificada: con useEffect + useState (alternativa válida)

Si no te acuerdas de `clientLoader` + `useActionState`, puedes usar el patrón
clásico con `useEffect` y `useState`. **Ambos son correctos conceptualmente:**

```tsx
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getGames, createGame } from "~/services/games-service";
import type Game from "~/models/Game";

export default function GamesList() {

    const [discounted, setDiscounted] = useState<Game[]>([]);
    const [notDiscounted, setNotDiscounted] = useState<Game[]>([]);

    // Campos del formulario
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    // Cargar datos al montar (como ngOnInit)
    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        setDiscounted(await getGames(true));
        setNotDiscounted(await getGames(false));
    }

    async function handleCreate() {
        try {
            await createGame(name, price, 0, false);
            loadGames(); // recargar listas
        } catch (e) {
            alert("Ya existe un juego con ese nombre");
        }
    }

    return (
        <div>
            <h2>Registrar nuevo juego</h2>
            <input type="text" value={name}
                onChange={e => setName(e.target.value)} />
            <input type="number" value={price}
                onChange={e => setPrice(Number(e.target.value))} />
            <button onClick={handleCreate}>Registrar</button>

            <h2>Juegos</h2>
            <ul>
                {notDiscounted.map(game => (
                    <li key={game.id}>
                        <Link to={`/game/${game.id}`}>{game.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

### Cuándo usar cada patrón

| Patrón | Ventaja | Inconveniente |
|---|---|---|
| `clientLoader` + `useActionState` | Es lo que enseña el profesor | Más código para memorizar |
| `useEffect` + `useState` | Más simple, más fácil de recordar | No es el patrón "oficial" del profesor |

> **Recomendación:** intenta memorizar `clientLoader` para la carga de datos
> (es corto) y `useActionState` para formularios. Si no te sale, `useEffect`
> + `useState` + `alert()` para errores es perfectamente válido.

---

## 6. Página detalle — `routes/game-detail.tsx`

### Cuándo se usa
Cuando el enunciado pide una vista de detalle con botones de acción.

### Plantilla con clientLoader

```tsx
import { useNavigate } from "react-router";
import { getGame, removeGame, updateGame } from "~/services/games-service";
import type { Route } from "./+types/game-detail";
import { useState } from "react";

// Cargar el juego por id antes de renderizar
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return await getGame(params.id!);
}

export default function GameDetail({ loaderData }: Route.ComponentProps) {

    const game = loaderData;
    const navigate = useNavigate();
    const [notAvailable, setNotAvailable] = useState(false);

    async function handleDelete() {
        await removeGame(game.id);
        navigate("/");
    }

    async function handleBuy() {
        const updated = await updateGame(
            game.id, game.name, game.price, game.stock - 1, game.discount
        );
        if (updated.stock === 0) {
            setNotAvailable(true);
        } else {
            navigate(`/game/${game.id}`); // recargar
        }
    }

    async function handleOffer() {
        await updateGame(game.id, game.name, game.price, game.stock, true);
        navigate(`/game/${game.id}`); // recargar
    }

    // Si el juego ya no está disponible
    if (notAvailable) {
        return <p>Juego no disponible</p>;
    }

    return (
        <div>
            <h2>
                {game.name}
                {game.stock < 3 && <span style={{color: "red"}}> Ultimas unidades</span>}
            </h2>

            <ul>
                <li>Precio base: {game.price}</li>
                {game.discount && <li>Precio oferta: {game.price * 0.8}</li>}
                <li>Unidades disponibles: {game.stock}</li>
            </ul>

            <button onClick={handleBuy}>Comprar</button>
            <button onClick={handleOffer}>Poner en oferta</button>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}
```

### Variante con useEffect + useState (alternativa)

```tsx
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getGame, removeGame } from "~/services/games-service";
import type Game from "~/models/Game";

export default function GameDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);

    useEffect(() => {
        getGame(id!).then(g => setGame(g));
    }, [id]);

    if (!game) return <p>Cargando...</p>;

    async function handleDelete() {
        await removeGame(game!.id);
        navigate("/");
    }

    return (
        <div>
            <h2>{game.name}</h2>
            <p>Precio: {game.price}</p>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
}
```

---

## 7. Tabla de equivalencias Angular → React (resumen rápido)

| Angular | React (framework mode) |
|---|---|
| `app.routing.ts` con `Routes = [...]` | `routes.ts` con `index()`, `route()`, `layout()` |
| `<router-outlet>` | `<Outlet />` |
| `*ngFor="let g of games"` | `{games.map(g => <li key={g.id}>...</li>)}` |
| `*ngIf="condicion"` | `{condicion && <JSX>}` |
| `*ngIf="x; else y"` | `{x ? <A/> : <B/>}` |
| `[(ngModel)]="campo"` | `value={campo} onChange={e => setCampo(e.target.value)}` |
| `(click)="metodo()"` | `onClick={() => metodo()}` |
| `[routerLink]="['/game', id]"` | `<Link to={'/game/' + id}>` |
| `httpClient.get(url).subscribe(...)` | `fetch(url).then(...)` o `await fetch(url)` |
| `ngOnInit` | `useEffect(() => {...}, [])` o `clientLoader` |
| `activatedRoute.params["id"]` | `useParams()` o `params.id` en `clientLoader` |
| `router.navigate(['/'])` | `navigate("/")` |
| `@Component({templateUrl: ...})` | `export default function X() { return <div>...</div> }` |
| Service inyectado con DI | Módulo `.ts` con `export async function` |
| `ngModel` (two-way binding) | `value` + `onChange` (one-way, explícito) |
| `@Input()` prop | Props: `function X({ titulo }: { titulo: string })` |
| `@Output()` event | Callback prop: `function X({ onSave }: { onSave: () => void })` |

---

## 8. Resumen: orden de escritura y tiempo

| # | Fichero | Tiempo | Qué hace |
|---|---|---|---|
| 1 | `models/Game.ts` | 1 min | Interface con los campos del DTO |
| 2 | `services/games-service.ts` | 5 min | Funciones fetch (GET, POST, PUT, DELETE) |
| 3 | `routes.ts` | 2 min | Configurar rutas con `index()` y `route()` |
| 4 | `routes/home.tsx` | 2 min | Layout con título + `<Outlet />` |
| 5 | `routes/games-list.tsx` | 15 min | Formulario + listado(s) + links |
| 6 | `routes/game-detail.tsx` | 10 min | Datos + botones de acción |
| | **Total** | **~35 min** | |

---

## 9. Auth (solo si el enunciado lo pide)

### Store con Zustand para usuario autenticado

```ts
// stores/user-store.ts
import { create } from "zustand";

interface UserStore {
    username: string | null;
    role: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    username: null,
    role: null,
    login: async (username, password) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) throw new Error("Login failed");
        const user = await res.json();
        set({ username: user.username, role: user.role });
    },
    logout: () => {
        set({ username: null, role: null });
    },
}));
```

### Uso en un componente

```tsx
import { useUserStore } from "~/stores/user-store";

export default function Header() {
    const { username, logout } = useUserStore();

    return (
        <div>
            {username ? (
                <div>
                    <span>Hola, {username}</span>
                    <button onClick={logout}>Cerrar sesión</button>
                </div>
            ) : (
                <Link to="/login">Iniciar sesión</Link>
            )}
        </div>
    );
}
```

> Solo incluir auth si el enunciado lo pide explícitamente.
> En 2025 no pidieron auth en el examen. En 2024 sí (Marvel Pop Paradise).
