# Cascina Caccia API Server

This is a brief description of the Spring Boot application. More information about the overall backend project can be found in the [Backend Docs file](../Docs/backend/README.md).

## Developers

[Aliberti Alessandro](https://github.com/alealiberti) | [Marcolongo Ettore](https://github.com/MrLetss)

## Project Structure

The Spring Boot application contains some static resources to easily handle the bodies of the emails that are sent automatically.
They can be found in the resources folder, and are structured as follows:

- **email-templates**:
  - `header.html`
  - `footer.html`
  - **body** (_this folder contains the bodies of the different emails that will be send_):
    - `information-admin.html`
    - `information-user.html`
    - `reservation-admin.html`
    - `reservation-user.html`

The core application provides everything needed to manage all the requests from the users.
Including CRUD operations for both requests and users.  
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
- **repos** (_contains the intrefaces that provide access and manipulation of the entities in the DB_):
  - `UserDAO`
  - `InformationDAO`
  - `ReservationDAO`
- **services** (_contains the classes that provides the methods with logic of the application_):
  - `UserService`
  - `InformationService`
  - `ReservationService`
  - `JWTService` (_contains the logic to create, delete and manage authorization tokens_)
  - `HTMLEmailService` (_contains the logic to send emails_)
  - `DateConverterService` (_contains the logic to convert dates, for DTO-to-Entity conversion and vice versa_)
  - `CustomUserDetailsService` (_contains the logic to manage custom users for Spring Security_)
- **controllers** (_contains the classes that handle the endpoints for the API requests_):
  - `UserREST`
  - `InformationREST`
  - `ReservationREST`
  - `AuthorizationREST` (_contains the login endpoint_)

## API Requests

The API requests provide everything needed to handle and manage the requests from the users. `e.g.`: CRUD operations for the information or reservation requests.  
More information on the [API Readme](../Docs/backend/API/README.md).
