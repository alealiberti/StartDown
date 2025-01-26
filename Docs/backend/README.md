# Cascina Caccia Backend

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-green)
![MariaDB](https://img.shields.io/badge/MariaDB-10.4.28-orange)

## Table of Contents

- [Team](#team)
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Installation Guide](#installation-guide)
- [API Requests](#API-Requests)

## Team

[Aliberti Alessandro](https://github.com/alealiberti) | [Marcolongo Ettore](https://github.com/MrLetss)

## Overview

This project is an API Server connected to the main page and the backoffice page of the Cascina Caccia educational website.  
It features a backend built with Spring Boot and a MySQL database for data persistence.
The application allows users to create information or reservation requests, but also allows admins to manage them.
It provieds authentication and session management.

## Project Structure

### Database

The database has 3 tables and their structure is the following:

- users
  - `id` (_Primary Key, int_)
  - `name` (_MAX 25 chars_)
  - `surname` (_MAX 25 chars_)
  - `email` (_MAX 50 chars_)
  - `password` (_hashed, MAX 255 chars_)
  - `role` (_MAX 50 chars_)
- informations
  - `id` (_Primary Key, int_)
  - `name` (_MAX 25 chars_)
  - `surname` (_MAX 25 chars_)
  - `phone` (_Nullable, MAX 10 chars_)
  - `email` (_MAX 50 chars_)
  - `date_send` (_date object_)
  - `text` (_MAX 1000 chars_)
  - `archived` (_tinyint_)
- reservations
  - `id` (_Primary Key, int_)
  - `name` (_MAX 25 chars_)
  - `surname` (_MAX 25 chars_)
  - `phone` (_Nullable, MAX 10 chars_)
  - `email` (_MAX 50 chars_)
  - `date_send` (_date object_)
  - `date_start` (_date object_)
  - `date_finish` (_Nullable, date object_)
  - `hour_start` (_Nullable, time object_)
  - `hour_finish` (_Nullable, time object_)
  - `status` (_MAX 25 chars_)
  - `archived` (_tinyint_)
  - `type_group` (_MAX 25 chars_)
  - `visitors` (_int_)
  - `companions` (_Nullable, int_)
  - `additional_info` (_Nullable,, MAX 1000 chars_)
  - `mobility_problems` (_tinyint_)

### API Server

The Spring Boot application contains some static resources to easily handle the bodies of the emails that are send automatically.
They can be found in the resources folder, and are structured as follows:

- **email-templates**:
  - `header.html`
  - `footer.html`
  - **body** (_this folder contains the bodies of the different emails that will be send_):
    - `information-admin.html`
    - `information-user.html`
    - `reservation-admin.html`
    - `reservation-user.html`

The core application provides everything needed to manage all the requests form the users.
Such as the CRUD operation for the requests and also for the users.
It also handles the authentication of the users for the backoffice page.  
The structure is the following:

- **configuration** (_contains the configuration classes_):
  - `SecurityConfig` (_contains the Spring Security configs_)
  - `PasswordChangeRequest` (_represents a request to change a user's password_)
  - `JWTFilter` (_contains the JWT token configs_)
- **exceptions** (_contains the custom exceptions classes and the handler_):

  - `GlobalExceptionHandler` (_handles all the exceptions_)
  - `EmailSendException` (_thrown when something is wrong when sending the emails_)
  - `InformationNotFoundException` (_thrown when an information is not found in certain situations_)
  - `ReservationNotFoundException` (_thrown when a reservation is not found in certain situations_)
  - `UserNotFoundException` (_thrown when a user is not found in certain situations_)

- **entities** (_contains the classes representing the entities of the DB and some DTOs_):
  - `User`
  - `Information`
  - `Reservation`
  - `InformationDTO` (_represents the entity information, with a different layout for passing and receiving data to and from the frontend_)
  - `ReservationDTO` (_represents the entity reservation, with a different layout for passing and receiving data to and from the frontend_)
- **repos** (_contains the intrefaces that provides access and manipulation of the entities in the DB_):
  - `UserDAO`
  - `InformationDAO`
  - `ReservationDAO`
- **services** (_contains the classes that provides the methods with logic of the application_):
  - `UserService`
  - `InformationService`
  - `ReservationService`
  - `JWTService` (_contains the logic to create, delete and manage authorization tokens_)
  - `HTMLEmailService` (_contains the logic to send emails_)
  - `DateConverterService` (_contains the logic to convert dates, for DTO to Entity conversion and viceversa_)
  - `CustomUserDetailsService` (_contains the logic to manage custom users for Spring Security_)
- **controllers** (_contains the classes that handles the endpoints for the API requests_):
  - `UserREST`
  - `InformationREST`
  - `ReservationREST`
  - `AuthorizationREST` (_contains the login endpoint_)

## Technology Stack

- `Java 17`: The core programming language for backend logic.
- `Spring Boot 3.4.1`: Provides a simplified, powerful framework for building the backend REST API.
- `MariaDB 10.4.28`: Chosen for its compatibility with MySQL, it stores user data, card details, and deck configurations.
- `Maven`: Manages project dependencies and builds processes for the Java backend.

## Installation Guide

### Prerequisites

These three programs are mandatory to run the API server:

- [Java JDK 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- [Maven](https://maven.apache.org/install.html)
- [MariaDB Server](https://mariadb.org/download/)

### Setup Instructions

1. **Set Up the Database**  
   Start the MariaDB server.
   Import the [`cascina-caccia.sql`](../../Database/cascina_caccia.sql) file provided in the [Database](../../Database/) directory to the database server.
   It is possible to import the [`data-dump.sql`](../../Database/data-dump.sql) file to have some test data.  
   The DB should now be created, with a default `OWNER` user in the table `users`.  
   The hashed password is `Password123*`, but it is reccomanded to change it when the server is fully started.

2. **Configure the Application**  
   Open the [application.properties](../../backend/cascina-caccia/src/main/resources/application.properties) file
   and update the `DB settings` (if needed) and the `email settings` to properly send emails with your email account.

3. **Build and Run the Application**  
   In the [project directory](../../backend/cascina-caccia/) use Maven to build and run the project:

   ```bash
   mvn clean install
   ```

   Then, in the [target directory](../../backend/cascina-caccia/target/), the application can be started:

   ```bash
   java -jar cascina-caccia-0.0.1-SNAPSHOT.jar
   ```

   The application will be available at http://localhost:8080.

## API Requests

The API requests provide everything needed to handle and manage the requests from the users. `e.g.`: CRUD operations for the information or reservation requests.  
More information on the [API Readme](./API/README.md).
