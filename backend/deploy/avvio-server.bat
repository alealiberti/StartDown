@echo off

set JAR_PATH=.\cascina-caccia-api.jar
set SQL_PATH=.\cascina-caccia.sql

set DB_USER=root
set DB_PASSWORD=
set DB_HOST=localhost
set DB_PORT=3306

echo Creazione del database in corso...
mariadb -u%DB_USER% -p%DB_PASSWORD% -h%DB_HOST% -P%DB_PORT% < "%SQL_PATH%"
if %ERRORLEVEL% neq 0 (
    echo Errore durante la creazione del database.
    pause
    exit /b 1
)

echo Avvio del server Spring Boot...
java -jar "%JAR_PATH%"
if %ERRORLEVEL% neq 0 (
    echo Errore durante l'avvio del server.
    pause
    exit /b 1
)

echo Operazione completata con successo.
pause
