# 05 — Plantillas Docker

> Fase 2 del plan de estudio. Plantillas memorizables para el examen.
> Según la entrega práctica 2026, el profesor enseña Dockerfile multistage
> y Docker Compose juntos. Pueden pedir cualquiera o ambos.

---

## 1. Docker Compose — `docker/docker-compose.yaml`

### Cuándo se usa
Cuando el enunciado dice "desplegar con Docker Compose" o "fichero docker-compose.yaml".
Es el formato que cayó en **Mayo y Junio 2025** (el más probable en 2026).

### Plantilla con restart (formato examen 2025)

```yaml
services:
  web:
    image: daw/nombre:1.0.0
    ports:
      - "8443:8443"
    restart: on-failure
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/nombre
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=pass
  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=pass
      - MYSQL_DATABASE=nombre
```

### Plantilla con healthcheck (formato entrega 2026)

```yaml
services:
  web:
    image: daw/nombre:1.0.0
    ports:
      - "8443:8443"
    depends_on:
      db:
        condition: service_healthy
    environment:
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/nombre
      - SPRING_DATASOURCE_USERNAME=root
      - SPRING_DATASOURCE_PASSWORD=pass
  db:
    image: mysql:8.0
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      - MYSQL_ROOT_PASSWORD=pass
      - MYSQL_DATABASE=nombre
```

### Qué sustituir del enunciado (siempre cambia)

| Campo | De dónde sacarlo | Ejemplo |
|---|---|---|
| `image: daw/nombre:1.0.0` | El enunciado da el nombre exacto | `daw/ludomaniacos:1.0.0` |
| `ports: "HOST:CONTAINER"` | El enunciado da ambos puertos | `"443:8443"` o `"8443:8443"` |
| `restart:` o `healthcheck` | El enunciado dice cuál usar | `restart: on-failure` |
| `MYSQL_DATABASE=nombre` | Normalmente el nombre de la app | `ludomaniacos` |
| `MYSQL_ROOT_PASSWORD` | Tú eliges (pero debe coincidir) | `pass` |

### Reglas fijas (nunca cambian)

- `SPRING_DATASOURCE_URL` siempre usa `db` como host (nombre del servicio), nunca `localhost`.
- `SPRING_DATASOURCE_URL` siempre usa puerto `3306` (puerto interno de MySQL).
- `SPRING_DATASOURCE_USERNAME` siempre es `root`.
- `SPRING_DATASOURCE_PASSWORD` **DEBE coincidir** con `MYSQL_ROOT_PASSWORD`.
- `MYSQL_DATABASE` **DEBE coincidir** con el nombre en la URL del datasource.
- El puerto 3306 de MySQL **NO se expone** al host (sin `ports:` en el servicio `db`).
- Indentación: 2 espacios en YAML.

### Errores comunes
- Poner `localhost` en vez de `db` en la URL → los contenedores no se ven.
- Que la password no coincida entre `web` y `db`.
- Que el nombre de la BD no coincida entre la URL y `MYSQL_DATABASE`.
- Exponer el puerto 3306 al host (el enunciado siempre dice que no).
- Olvidar poner `restart` o `healthcheck` para que la app espere a MySQL.

---

## 2. Dockerfile Multistage — `docker/Dockerfile`

### Cuándo se usa
Cuando el enunciado dice "Dockerfile multistage" o "construir imagen con la aplicación empaquetada".
Es el formato que cayó en **2023 y 2024**. También se usa en la entrega 2026.

### Plantilla (backend Spring + frontend React)

```dockerfile
# Etapa 1: Construir el backend con Maven
FROM maven:3.9.6 AS backend
COPY backend/ /app/
RUN mvn -f /app/pom.xml package -DskipTests

# Etapa 2: Construir el frontend con Node
FROM node:20.12.0 AS frontend
COPY frontend/ /app/
WORKDIR /app
RUN npm install
RUN npm run build

# Etapa 3: Imagen final con solo el runtime
FROM openjdk:21-jdk-slim
COPY --from=backend /app/target/*.jar /app.jar
COPY --from=frontend /app/build/ /app/static/
CMD ["java", "-jar", "/app.jar"]
```

### Variante: solo backend (sin frontend)

```dockerfile
FROM maven:3.9.6 AS backend
COPY backend/ /app/
RUN mvn -f /app/pom.xml package -DskipTests

FROM openjdk:21-jdk-slim
COPY --from=backend /app/target/*.jar /app.jar
CMD ["java", "-jar", "/app.jar"]
```

### Variante: frontend con NGINX (Mayo 2024)

```dockerfile
# Etapa 1: Construir el frontend
FROM node:20.12.2 AS build
COPY frontend/ /app/
WORKDIR /app
RUN npm install
RUN npm run build

# Etapa 2: Servir con NGINX
FROM nginx:1.26.0
COPY --from=build /app/dist/ /usr/share/nginx/html/
```

### Qué sustituir del enunciado

| Campo | De dónde sacarlo |
|---|---|
| `FROM maven:X.X.X` | El enunciado da la versión exacta |
| `FROM node:X.X.X` | El enunciado da la versión exacta |
| `FROM openjdk:X` o `openjdk-jre:X` | El enunciado da la versión exacta |
| Carpeta de salida del frontend | Depende del framework: `build/`, `dist/`, etc. |
| Donde copiar el frontend | `/app/static/` o `/usr/share/nginx/html/` |

### Errores comunes
- Olvidar `-DskipTests` en `mvn package` → los tests fallan sin BD.
- Olvidar `WORKDIR /app` antes de `npm install`.
- Usar versiones de imagen que no existen (usar las que da el enunciado).
- Olvidar `AS nombre` en las etapas → `COPY --from=nombre` no funciona.
- Olvidar `CMD` en la etapa final.

---

## 3. Scripts — `docker/create_image.sh` y `docker/publish_image.sh`

### Cuándo se usa
Cuando el enunciado pide un script de construcción/publicación.

### `create_image.sh` (construir la imagen)

```bash
#!/bin/bash
docker build -t $1 -f docker/Dockerfile .
```

> `$1` = nombre de la imagen pasado como parámetro.
> Ejemplo: `./create_image.sh daw/ludomaniacos:1.0.0`

### Variante sin parámetro (nombre hardcodeado)

```bash
#!/bin/bash
docker build -t daw/ludomaniacos:1.0.0 -f docker/Dockerfile .
```

### `publish_image.sh` (publicar en DockerHub)

```bash
#!/bin/bash
docker push $1
```

### Variante todo-en-uno (build + push, formato 2023-2024)

```bash
#!/bin/bash
docker build -t daw/nombre:1.0.0 .
docker push daw/nombre:1.0.0
```

### Errores comunes
- Olvidar que el script se ejecuta desde la raíz del proyecto, no desde `docker/`.
- Olvidar el `.` al final de `docker build` (indica el directorio de contexto).

---

## 4. Resumen: qué memorizar según lo que pidan

| El enunciado pide... | Ficheros | Tiempo |
|---|---|---|
| Docker Compose | `docker-compose.yaml` (12 líneas) | 3-5 min |
| Dockerfile multistage | `Dockerfile` (10 líneas) | 3-5 min |
| Dockerfile + script | `Dockerfile` + `create_image.sh` (2 líneas) | 5 min |
| Todo junto | `Dockerfile` + `docker-compose.yaml` + scripts | 8-10 min |

---

## 5. Checklist rápida antes de entregar

- [ ] ¿El nombre de la imagen es exactamente el que dice el enunciado?
- [ ] ¿Los puertos HOST:CONTAINER son los que dice el enunciado?
- [ ] ¿`SPRING_DATASOURCE_URL` usa `db:3306` (no `localhost`)?
- [ ] ¿Las passwords coinciden entre `web` y `db`?
- [ ] ¿El nombre de la BD coincide entre la URL y `MYSQL_DATABASE`?
- [ ] ¿El puerto 3306 NO está expuesto al host?
- [ ] ¿Las versiones de las imágenes son las del enunciado?
- [ ] ¿El Dockerfile usa `AS nombre` y `COPY --from=nombre`?
