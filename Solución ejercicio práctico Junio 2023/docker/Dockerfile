# Stage frontend (angular)
FROM node:16.0.0 AS frontend
WORKDIR /project
COPY /frontend .
RUN npm install
RUN npm run build -- --configuration production --base-href=/nano/

# Stage backend (java)
FROM maven:3.11.0 AS backend
WORKDIR /project
COPY /backend/pom.xml /project/
RUN mvn clean install
COPY /backend/src /project/src
COPY --from=frontend /project/dist/frontend/browser/ /project/src/main/resources/static/nano
RUN mvn package -o --DskipTests=true

# Stage jdk
FROM openjdk-jre:17.0.0
WORKDIR /usr/src/app
COPY --from=backend /project/target/*.jar /usr/src/app/
EXPOSE 8080
CMD [ "java", "-jar", "backend.jar"]