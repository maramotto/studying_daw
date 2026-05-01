# Stage frontend (angular)
FROM node:20.12.2 AS frontend
WORKDIR /project
COPY /frontend /project/
RUN npm install
RUN npm run build -- --configuration production

# Stage nginx
FROM nginx:1.26.0
COPY --from=frontend /project/dist/frontend/browser/ /usr/share/nginx/html/