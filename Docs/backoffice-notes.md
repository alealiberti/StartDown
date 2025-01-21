# FrontEnd

## Sezione Richieste di informazioni e Prenotazioni

- Aggiornare la pagina per ogni azione
- Pulsante cambio data e ora per le prenotazioni
- Contatto via mail per accordarsi
- Pulsante per prenotazioni cambio stato accordare -> chiusa
- Numero nuove prenotazioni nella card in dashboard:
  - chiamata per stato "ricevuta"
  - incremento di n+1 ogni stato ricevuto
- Numero nuove informazioni nella card in dashboard:
  - chiamata per isArchivata == false
  - incremento di n+1 ogni domanda che non è archiviata
- Visite giornaliere chiedere a Shadi:
  - local storage / cookie
  - google analytics 


--- 


# BackEnd

## Da implementare

### Ordinamento

- status prenotazioni:

  - nuova
  - accordare
  - chiusa

- data di invio:

  - decrescente

### Chiamate

- deafult /.../reservations manda per datesend e non è archiviata
- deafult /.../informations manda per datesend e non è archiviata
- getByVisitors non manda le archiviate
- getByDateStart non manda le archiviate
- date formato "GG/MM/AAAA"

### Aggiornamenti

- archiviata come campo boolean
- auto set del campo
- togliere gli status da informations

# Se riusciamo

# Sezione settings per utenti

## utenti Admin:

- cambio propria password

## utente Owner:

- cambio propria password
- cambio della password di altri utenti
- eliminazione di account
- creazione di altri account
