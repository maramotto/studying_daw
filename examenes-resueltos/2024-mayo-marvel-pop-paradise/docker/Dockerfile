# Stage 1: Build del frontend React con Node.
# Equivale a "ng build --configuration production" en Angular.
FROM node:20.12.2 AS frontend
WORKDIR /project
COPY /frontend /project/
RUN npm install
RUN npm run build

# Stage 2: Servir la SPA con NGINX.
# Copia los ficheros estaticos generados por el build al directorio de NGINX.
FROM nginx:1.26.0
COPY --from=frontend /project/build/client/ /usr/share/nginx/html/
