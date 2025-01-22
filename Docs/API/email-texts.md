# Information

## Admin

- dopo aver inserito il body, appendere una stringa formattata così:

```html
<ul class="request-details">
  <li>Nome: [Nome]</li>
  <li>Cognome: [Cognome]</li>
  <li>Messaggio: [Messaggio]</li>
</ul>
```

## User

- inserire questo pezzo e poi appendere il body

```html
<p>Ciao [Nome Utente],</p>
```

# Reservation

## Admin

- dopo aver inserito il body, appendere una stringa formattata così:

```html
<ul class="request-details">
  <li>Nome: [Nome]</li>
  <li>Cognome: [Cognome]</li>
  <li>Data richiesta: [Data richiesta]</li>
  <li>Tipo di visita: [Tipo di visita]</li>
  <li>Numero di partecipanti: [Numero partecipanti]</li>
  <li>Note aggiuntive: [Note opzionali fornite dall'utente]</li>
</ul>
```

## User

- inserire questo pezzo e poi appendere il body

```html
<p>Ciao [Nome Utente],</p>

<p>
  Grazie per aver effettuato una prenotazione presso Cascina Caccia! Ecco un
  riepilogo delle informazioni che ci hai fornito:
</p>

<ul class="booking-details">
  <li>Nome: [Nome]</li>
  <li>Cognome [Cognome]</li>
  <li>Data richiesta: [Data richiesta]</li>
  <li>Tipo di visita: [Tipo di visita]</li>
  <li>Numero di partecipanti: [Numero partecipanti]</li>
  <li>Note aggiuntive: [Note opzionali fornite dall'utente]</li>
</ul>
```
