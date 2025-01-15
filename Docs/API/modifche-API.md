# DB

- aggiungere campo boolean "archived" a reservations e informations
- rimuovere status da informations
- gli status nel dump devono essere tutti in minuscolo
- gli status nel dump di reservations devono essere i seguenti:
  - nuova
  - accordare
  - chiusa
- aggiornare i dump nel db

# Entity

- aggiungere campo boolean "archived" a reservations e informations
- aggiungere campo boolean "archived" a reservationDTO e informationDTO
- rimuovere status da informations e informationDTO

# Repo

- in informations e reservations aggiungere il metodo findByArchivedOrderByDateSendDesc(boolean isArchived)
- in reservations modificare il metodo findByOrderByVisitorsDesc in findByArchivedOrderByVisitorsDesc(boolean isArchived)
- in reservations modificare il metodo findByOrderByDateStartAscDateFinishDesc in findByArchivedOrderByDateStartAscDateFinishDesc(boolean isArchived)

# Service

- nella create delle informations rimuovere il setStatus e impostare un setArchived a false
- nella create delle reservations impostare un setArchived a false
- in informations e reservations creare il metodo getByNotArchivedAndByDateSend che richiama il metodo nuovo del DAO (passando come valore false)
- in reservations modificare il metodo findByOrderByVisitorsDesc in findByNotArchivedOrderByVisitorsDesc(false)
- in reservations modificare il metodo findByOrderByDateStartAscDateFinishDesc in findByNotArchivedOrderByDateStartAscDateFinishDesc(false)

# Controller

- in informations e reservations la chiamata getAll deve restituire i dati ordinati per dateSend e controllare che non sia archiviata (richiamare il nuovo metodo del service)
- in informations e reservations rimuovere la chiamata getByDateSend
- modificare getByVisitors chiamando il metodo nuovo del service
- modificare getByDateStart chiamando il metodo nuovo del service
