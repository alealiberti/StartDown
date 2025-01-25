# API for Cascina Caccia

## API Requests List

The detailed list of the API requests with their descriptions can be fully seen by starting the server
and going to the [swagger documentation page](http://localhost:8080/swagger-ui/index.html#/l).  
It is possible to see all the requests and how they works, by importing the [collection](./cascina-caccia.postman_collection.json) to Postman.
All the requests will already have all the requirements to properly work, e.g. the bodies of the requests.
To make everything work, the first step will be to use the login request to get the authorization token,
then the token needs to be copied into the `Authorization` section of the `Cascina Caccia` folder.
Once these steps are done, every request can be accessed.

In both the `Swagger documentation page` and the `Postman collection` there will be the following requests:

- CRUD for the Users
- CRUD for the Reservations
- CRUD for the Informations
- Authorization

## Accessibility of the Requests

The requests are not all accessible for everyone.
There are some requests that can be accessed by everyone and others that are avaiable only after the login.

### Public Access Requests

The only requests that don't need the authentication are: the ones accessible from the web pages to create Information and Reservation requests with the forms, the access to the API documentation and the login request.  
These requests are:

- Forms related requests:
  - `POST: http://localhost:8080/cascina-caccia/informations/create-information`
  - `POST: http://localhost:8080/cascina-caccia/reservations/create-reservation`
- Swagger Documentation related request:
  - `GET: http://localhost:8080/swagger-ui/index.html`
- Login related request:
  - `POST: http://localhost:8080/auth/login`

### Backoffice Requests

The authentication is mandatory to use all the other requests. These requests are the ones that are accessed from the backoffice web pages,
to handle the different requests of information and reservation created by the people using the previously mentioned requests.  
However, not every request is accessible by everyone who logs in.

#### OWNER Accessible Requests

There are some requests that can be accessed only by the user with the role `OWNER`.  
These requests are all related to the management of the users and are:

- `GET: http://localhost:8080/cascina-caccia/users`
- `GET: http://localhost:8080/cascina-caccia/users/{id}`
- `GET: http://localhost:8080/cascina-caccia/users/email/{email}`
- `POST: http://localhost:8080/cascina-caccia/users/create-user`
- `PUT: http://localhost:8080/cascina-caccia/users/update-user-role`
- `PUT: http://localhost:8080/cascina-caccia/users/change-user-password/{id}`
- `DELETE: http://localhost:8080/cascina-caccia/users/delete-user/{id}`

#### OWNER and ADMIN Accessible Requests

The remaining requests can be accessed by everyone who is authenticated in the backoffice page.

- User related requests:
  - `PUT: http://localhost:8080/cascina-caccia/users/update-user`
  - `PUT: http://localhost:8080/cascina-caccia/users/change-password`
- Reservation related requests:
  - `GET: http://localhost:8080/cascina-caccia/reservations`
  - `GET: http://localhost:8080/cascina-caccia/reservations/{id}`
  - `GET: http://localhost:8080/cascina-caccia/reservations/visitors`
  - `GET: http://localhost:8080/cascina-caccia/reservations/status/{status}`
  - `GET: http://localhost:8080/cascina-caccia/reservations/get-all`
  - `GET: http://localhost:8080/cascina-caccia/reservations/datestart`
  - `GET: http://localhost:8080/cascina-caccia/reservations/archived`
  - `PUT: http://localhost:8080/cascina-caccia/reservations/update-reservation/{id}`
  - `DELETE: http://localhost:8080/cascina-caccia/reservations/delete-reservation/{id}`
- Information related requests:
  - `GET: http://localhost:8080/cascina-caccia/informations`
  - `GET: http://localhost:8080/cascina-caccia/informations/{id}`
  - `GET: http://localhost:8080/cascina-caccia/informations/get-all`
  - `GET: http://localhost:8080/cascina-caccia/informations/archived`
  - `PUT: http://localhost:8080/cascina-caccia/informations/update-information/{id}`
  - `DELETE: http://localhost:8080/cascina-caccia/informations/delete-information/{id}`
