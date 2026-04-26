# Stage frontend (angular)
FROM node:20.12.0 AS frontend
WORKDIR /project
COPY /frontend .
RUN npm install
RUN npm run build -- --configuration production --base-href=/harleydawson

# Stage backend (java)
FROM maven:3.17.0 AS backend
WORKDIR /project
COPY /backend/pom.xml /project/
RUN mvn clean install
COPY /backend/src /project/src
COPY --from=frontend /project/dist/frontend/browser/ /project/src/main/resources/static/harleydawson
RUN mvn package -o --DskipTests=true

# Stage jdk
FROM openjdk-jre:21.0.0
WORKDIR /usr/src/app
COPY --from=backend /project/target/backend.jar /usr/src/app/
EXPOSE 8080
CMD [ "java", "-jar", "backend.jar"]