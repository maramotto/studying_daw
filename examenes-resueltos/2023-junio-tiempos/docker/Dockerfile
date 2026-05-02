# Stage 1: Compilar el frontend (React/Angular)
# node:16.0.0 como indica el enunciado.
FROM node:16.0.0 AS frontend
WORKDIR /project
COPY /frontend .
RUN npm install
RUN npm run build

# Stage 2: Compilar el backend (Spring Boot con Maven)
# maven:3.11.0 como indica el enunciado.
FROM maven:3.11.0 AS backend
WORKDIR /project
COPY /backend/pom.xml /project/
RUN mvn clean install
COPY /backend/src /project/src
# Copiar el frontend compilado dentro de los recursos estaticos del backend.
COPY --from=frontend /project/dist/ /project/src/main/resources/static/
RUN mvn package -o -DskipTests=true

# Stage 3: Imagen final ligera solo con el JRE para ejecutar el JAR.
# openjdk-jre:17.0.0 como indica el enunciado.
FROM openjdk-jre:17.0.0
WORKDIR /usr/src/app
COPY --from=backend /project/target/*.jar /usr/src/app/
EXPOSE 8080
CMD [ "java", "-jar", "backend.jar"]
