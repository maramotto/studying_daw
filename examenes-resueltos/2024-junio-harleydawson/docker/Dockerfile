# Stage 1: construir el frontend (React)
FROM node:20.12.0 AS frontend
WORKDIR /project
COPY /frontend .
RUN npm install
RUN npm run build

# Stage 2: construir el backend (Spring Boot) e incluir el frontend compilado
FROM maven:3.17.0 AS backend
WORKDIR /project
COPY /backend/pom.xml /project/
RUN mvn clean install
COPY /backend/src /project/src
COPY --from=frontend /project/build/ /project/src/main/resources/static/
RUN mvn package -o -DskipTests=true

# Stage 3: imagen final ligera solo con el JAR
FROM openjdk-jre:21.0.0
WORKDIR /usr/src/app
COPY --from=backend /project/target/backend.jar /usr/src/app/
EXPOSE 8080
CMD ["java", "-jar", "backend.jar"]
