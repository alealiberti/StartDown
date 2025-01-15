# DB

- aggiungere campo boolean "archived" a reservations e informations
- rimuovere status da informations
- gli status devono essere tutti in minuscolo
- aggiornare i dump nel db
- gli status nel dump di reservations devono essere i seguenti:
  - nuova
  - accordare
  - chiusa

# Entity

- aggiungere campo boolean "archived" a reservations e informations
- rimuovere status da informations

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

# Formato delle date

- creare una funzione per formattare le date in ingresso (nei metodi PUT)
- creare una funzione per formattare le date in uscita (nei metodi GET)
- implementare un Service apposito
- chiamare le funzioni nei service ogni volta che c'è un passaggio di date

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

// metodo per convertire le date dal frontend al backend
public LocalDate parseDate(String dateStr) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    try {
        return LocalDate.parse(dateStr, formatter);
    } catch (DateTimeParseException e) {
        throw new IllegalArgumentException("Formato della data non valido: " + dateStr, e);
    }
}

// Metodo per convertire da LocalDate a formato "GG/MM/AAAA"
public static String formatToFrontendDate(LocalDate localDate) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    return localDate.format(formatter);
}
```

# Aggiornare API Postman
