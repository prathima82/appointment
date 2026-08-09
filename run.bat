@echo off
title Liberty Heart ^& Vascular Surgery Centre Launcher
echo ========================================================
echo   LIBERTY HEART ^& VASCULAR SURGERY CENTRE PORTAL
echo   Concurrently starting Spring Boot Backend ^& React Frontend
echo ========================================================

:: Configure JDK 21 path
set JAVA_HOME=C:\Users\poran\.antigravity\extensions\redhat.java-1.54.0-win32-x64\jre\21.0.10-win32-x86_64
set PATH=%JAVA_HOME%\bin;%PATH%

echo [+] Starting Spring Boot Backend (Port: 8080, DB: H2 File)...
start "Spring Boot Backend" cmd /k "cd backend && mvn spring-boot:run"

echo [+] Starting React Frontend Dev Server (Port: 5173)...
start "React Frontend" cmd /k "cd frontend && npm run dev"

echo ========================================================
echo   SERVICES LAUNCHED SUCCESSFULLY
echo   - Backend Service: http://localhost:8080
echo   - Web Portal UI:   http://localhost:5173
echo   - H2 SQL Console:  http://localhost:8080/h2-console
echo                      (JDBC URL: jdbc:h2:file:./db/appointment_db)
echo                      (Username: sa, Password: password)
echo ========================================================
