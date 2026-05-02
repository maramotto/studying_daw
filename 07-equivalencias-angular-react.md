# 07 — Equivalencias Angular → React

> Fase 3 del plan de estudio. Tabla comparativa detallada.
> Pensada para alguien que sabe Angular y necesita "traducir" a React.
> Cada sección muestra el código Angular real (de las soluciones del profesor)
> y su equivalente React.

---

## 1. Estructura de un componente

### Angular
```typescript
// game.component.ts
@Component({
    templateUrl: "game.component.html",
})
export class GameComponent {
    public game: GameDTO;

    constructor(
        public activatedRoute: ActivatedRoute,
        private gameService: GameService
    ) {
        const id = activatedRoute.snapshot.params["id"];
        this.gameService.getGame(id).subscribe(
            (game: GameDTO) => this.game = game
        );
    }
}
```
```html
<!-- game.component.html (fichero separado) -->
<h1>{{ game.name }}</h1>
<p>{{ game.price }}</p>
```

### React
```tsx
// game-detail.tsx (todo en un solo fichero)
export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    return await getGame(params.id!);
}

export default function GameDetail({ loaderData }: Route.ComponentProps) {
    const game = loaderData;

    return (
        <div>
            <h1>{game.name}</h1>
            <p>{game.price}</p>
        </div>
    );
}
```

### Diferencias clave
| Aspecto | Angular | React |
|---|---|---|
| Ficheros | `.ts` + `.html` separados | Un solo `.tsx` |
| Definición | Clase con `@Component` | Función con `export default` |
| Template | Fichero HTML aparte | JSX dentro del `return` |
| Interpolación | `{{ variable }}` | `{variable}` (una llave) |
| Carga de datos | Constructor + subscribe | `clientLoader` o `useEffect` |
| Inyección | Constructor (DI) | Import directo |

---

## 2. Routing / Configuración de rutas

### Angular (`app.routing.ts`)
```typescript
const appRoutes: Routes = [
    { path: 'games', component: GamesComponent },
    { path: 'game/:id', component: GameComponent },
    { path: '', redirectTo: 'games', pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(appRoutes);
```

### React (`routes.ts`)
```typescript
import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/home.tsx", [
        index("routes/games-list.tsx"),
        route("game/:id", "routes/game-detail.tsx"),
    ]),
] satisfies RouteConfig;
```

### Correspondencia línea a línea
| Angular | React |
|---|---|
| `{ path: '', redirectTo: 'games' }` | `index("routes/games-list.tsx")` |
| `{ path: 'games', component: GamesComponent }` | `index("routes/games-list.tsx")` |
| `{ path: 'game/:id', component: GameComponent }` | `route("game/:id", "routes/game-detail.tsx")` |
| `RouterModule.forRoot(...)` | `layout("routes/home.tsx", [...])` |

---

## 3. Template / Directivas

### `*ngIf` → Renderizado condicional

```html
<!-- Angular -->
<span *ngIf="game.stock < 3" style="color: red;">Últimas unidades</span>
<button *ngIf="!ad.rented" (click)="rentHouse()">Casa Alquilada</button>
<button *ngIf="ad.rented" (click)="stopRentHouse()">Finalizar Alquiler</button>
```

```tsx
// React
{game.stock < 3 && <span style={{color: "red"}}>Últimas unidades</span>}
{!ad.rented && <button onClick={handleRent}>Casa Alquilada</button>}
{ad.rented && <button onClick={handleStopRent}>Finalizar Alquiler</button>}
```

### `*ngIf` con else → Ternario

```html
<!-- Angular -->
<div *ngIf="!gameNotAvailable; else noDisponible">
    <h1>{{ game.name }}</h1>
</div>
<ng-template #noDisponible>
    <h1>Juego no disponible</h1>
</ng-template>
```

```tsx
// React
{gameNotAvailable
    ? <h1>Juego no disponible</h1>
    : <div>
        <h1>{game.name}</h1>
      </div>
}
```

### `*ngFor` → `.map()`

```html
<!-- Angular -->
<li *ngFor="let game of discountedGames">
    <a [routerLink]="['/game', game.id]">{{ game.name }}</a>
    <span style="text-decoration: line-through">{{ game.price }}</span>
    <span>Precio oferta: {{ game.price * 0.8 }}</span>
</li>
```

```tsx
// React
{discountedGames.map(game => (
    <li key={game.id}>
        <Link to={`/game/${game.id}`}>{game.name}</Link>
        <span style={{textDecoration: "line-through"}}>{game.price}</span>
        <span>Precio oferta: {game.price * 0.8}</span>
    </li>
))}
```

> **Diferencias clave:**
> - React necesita `key={game.id}` (Angular lo gestiona internamente).
> - React usa `<Link to={...}>` en vez de `<a [routerLink]="...">`.
> - Las llaves de interpolación son simples `{}` en vez de dobles `{{}}`.

---

## 4. Data binding / Formularios

### `[(ngModel)]` → `value` + `onChange` (patrón clásico)

```html
<!-- Angular -->
<input [(ngModel)]="game.name" type="text" placeholder="Nombre" />
<input [(ngModel)]="game.price" type="number" placeholder="Precio" />
<input [(ngModel)]="game.discount" type="checkbox" />
<button (click)="createGame()">Registrar</button>
```

```tsx
// React (patrón con useState)
const [name, setName] = useState("");
const [price, setPrice] = useState(0);
const [discount, setDiscount] = useState(false);

<input type="text" value={name} onChange={e => setName(e.target.value)} />
<input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
<input type="checkbox" checked={discount} onChange={e => setDiscount(e.target.checked)} />
<button onClick={handleCreate}>Registrar</button>
```

### `[(ngModel)]` → `useActionState` + `FormData` (patrón del profesor)

```tsx
// React (patrón con useActionState — el profesor lo prefiere)
const [state, formAction, isPending] = useActionState(handleCreate, { error: null });

<form action={formAction}>
    <input type="text" name="name" required />
    <input type="number" name="price" required />
    <input type="checkbox" name="discount" />
    <button type="submit">{isPending ? "Creando..." : "Registrar"}</button>
</form>

// En handleCreate:
const name = formData.get("name") as string;
const price = Number(formData.get("price"));
const discount = formData.get("discount") === "on";
```

> **Diferencia fundamental:** Angular tiene two-way binding (el input
> y la variable están siempre sincronizados). React tiene one-way:
> el input muestra el valor de la variable, y el `onChange` actualiza
> la variable. O bien, con `useActionState`, los valores solo se leen
> al enviar el formulario (como un `<form>` HTML clásico).

---

## 5. Services / Llamadas HTTP

### Angular
```typescript
// service/game.service.ts
const BASE_URL = "/api/games/";

@Injectable({ providedIn: "root" })
export class GameService {
    constructor(private httpClient: HttpClient) {}

    public getGames(discount: boolean): Observable<GameDTO[]> {
        let params = new HttpParams();
        params = params.append("discount", discount);
        return this.httpClient.get(BASE_URL, { params }) as Observable<GameDTO[]>;
    }

    public createGame(game: GameDTO): Observable<GameDTO> {
        return this.httpClient.post(BASE_URL, game) as Observable<GameDTO>;
    }

    public deleteGame(id: number): Observable<GameDTO> {
        return this.httpClient.delete(BASE_URL + id) as Observable<GameDTO>;
    }
}
```

### React
```typescript
// services/games-service.ts
import type Game from "~/models/Game";

const API_URL = "/api/games";

export async function getGames(discount: boolean): Promise<Game[]> {
    const res = await fetch(`${API_URL}/?discount=${discount}`);
    return await res.json();
}

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

export async function removeGame(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
```

### Diferencias clave
| Aspecto | Angular | React |
|---|---|---|
| Tipo de retorno | `Observable<T>` | `Promise<T>` |
| Consumir resultado | `.subscribe(data => ...)` | `await funcion()` |
| Inyección | `@Injectable` + constructor DI | `import { funcion }` directo |
| Clase vs funciones | Clase con métodos | Funciones exportadas |
| HTTP client | `HttpClient` (built-in) | `fetch` (nativo del navegador) |
| JSON body | Se serializa automáticamente | `JSON.stringify()` manual |
| Headers | Automáticos | `headers: { "Content-Type": "application/json" }` manual |
| Error handling | `.subscribe(ok, error)` | `try/catch` con `await` |

---

## 6. Ciclo de vida

### Angular
```typescript
export class GamesComponent implements OnInit {
    public games: GameDTO[];

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.loadGames();
    }

    loadGames() {
        this.gameService.getGames(false).subscribe(
            (games: GameDTO[]) => this.games = games
        );
    }
}
```

### React (con useEffect)
```tsx
export default function GamesList() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        const data = await getGames(false);
        setGames(data);
    }
}
```

### React (con clientLoader)
```tsx
export async function clientLoader() {
    return await getGames(false);
}

export default function GamesList({ loaderData }: Route.ComponentProps) {
    const games = loaderData;
    // no necesitas useState ni useEffect, los datos ya están
}
```

---

## 7. Acciones del componente detalle

### Angular
```typescript
// game.component.ts
public deleteGame() {
    this.gameService.deleteGame(this.game.id).subscribe(() => {
        this.gameNotAvailable = true;
        this.game = null;
    });
}

public buyGame() {
    this.game.stock = this.game.stock - 1;
    this.gameService.replaceGame(this.game).subscribe((game: GameDTO) => {
        if (game.stock === 0) {
            this.gameNotAvailable = true;
        } else {
            this.game = game;
        }
    });
}

public offerGame() {
    this.game.discount = true;
    this.gameService.replaceGame(this.game).subscribe(
        (game: GameDTO) => this.game = game
    );
}
```

### React
```tsx
// game-detail.tsx
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
```

### Diferencias clave
| Angular | React |
|---|---|
| `this.game = game` (mutación) | `navigate(mismaRuta)` para recargar, o `setGame(game)` |
| `.subscribe(callback)` | `await` + línea siguiente |
| `this.gameNotAvailable = true` | `setNotAvailable(true)` |
| Navegar: inyectar Router | `const navigate = useNavigate()` |

---

## 8. Modelo / DTO

### Angular
```typescript
// model/game.dto.ts
export interface GameDTO {
    id?: number;
    name: String;
    price: number;
    stock: number;
    discount: boolean;
}
```

### React
```typescript
// models/Game.ts
export default interface Game {
    id: number;
    name: string;
    price: number;
    stock: number;
    discount: boolean;
}
```

> Prácticamente idénticos. La única diferencia: Angular usa `String` (objeto),
> React usa `string` (primitivo). En el examen ambos valen.

---

## 9. Manejo de errores

### Angular
```typescript
// Crear con validación de duplicado
public createAd() {
    this.adService.createAd(this.ad).subscribe(
        () => this.loadAds(),                              // éxito
        () => alert("Ya existe un anuncio con el mismo título")  // error
    );
}
```

### React (con useActionState)
```tsx
async function handleCreate(prevState: { error: string | null }, formData: FormData) {
    try {
        await createAd(/* ... */);
        navigate("/");
        return { error: null };
    } catch (e) {
        return { error: "Ya existe un anuncio con el mismo título" };
    }
}
// En el JSX:
{state.error && <p>{state.error}</p>}
```

### React (con alert, como el profesor en Angular)
```tsx
async function handleCreate() {
    try {
        await createAd(/* ... */);
        loadAds();
    } catch (e) {
        alert("Ya existe un anuncio con el mismo título");
    }
}
```

> Si el enunciado dice "mostrar una alerta con alert()", usa `alert()`.
> Si dice "mostrar un mensaje de error", usa renderizado condicional.

---

## 10. Tabla resumen rápida (para tener a mano)

| Concepto | Angular | React |
|---|---|---|
| Componente | `@Component` class | `export default function` |
| Template | `.html` separado | JSX en el `return` |
| Interpolación | `{{ x }}` | `{ x }` |
| Condicional | `*ngIf="x"` | `{x && <...>}` |
| Bucle | `*ngFor="let g of games"` | `{games.map(g => <... key={g.id}>)}` |
| Binding input | `[(ngModel)]="x"` | `value={x} onChange={...}` |
| Click | `(click)="fn()"` | `onClick={fn}` |
| Link | `[routerLink]="['/x', id]"` | `<Link to={'/x/'+id}>` |
| Outlet | `<router-outlet>` | `<Outlet />` |
| Navegar | `router.navigate(['/'])` | `navigate("/")` |
| Params | `activatedRoute.params["id"]` | `useParams()` o `params.id` |
| Init | `ngOnInit` | `useEffect(fn,[])` o `clientLoader` |
| HTTP GET | `httpClient.get().subscribe()` | `await fetch()` |
| HTTP POST | `httpClient.post(url,body)` | `fetch(url,{method:"POST",body:...})` |
| Service | `@Injectable` class | Módulo con `export function` |
| Estado | `this.x = valor` | `setX(valor)` |
| Rutas | `Routes = [{path,component}]` | `[index(...), route(...)]` |
| Style | `style="color:red"` | `style={{color:"red"}}` |
