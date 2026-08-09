# Build Stage
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy pom.xml and download dependencies (caching step)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build package
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy built JAR from Build Stage
COPY --from=build /app/target/*.jar app.jar

# Set environment variables for production database path
ENV SPRING_DATASOURCE_URL=jdbc:h2:file:/app/db/appointment_db;DB_CLOSE_DELAY=-1;AUTO_SERVER=TRUE

# Expose backend port
EXPOSE 8080

# Execute Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
