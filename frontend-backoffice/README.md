# Cascina Caccia Backoffice

## Author Details

- **Name:** Speciale Gabriele   
- **Contact:** gabriele.speciale@edu.itspiemonte.it  

---

## Project Overview

Questa applicazione rappresenta un sistema di backoffice progettato per gestire richieste, prenotazioni e impostazioni tramite un'interfaccia user-friendly. Sviluppato con **TypeScript**, **HTML**, **CSS** e configurato tramite **Vite**.

---

## Directory Structure

### **Root Files**

- **`.gitignore`**: Specifica i file e le directory da escludere dal versionamento Git.  
- **`index.html`**: Pagina principale del login per accedere al backoffice.  
- **`package.json` e `package-lock.json`**: File di configurazione di Node.js che specificano dipendenze e script.  
- **`README.md`**: Descrizione del progetto.  
- **`tsconfig.json`**: Configurazione per il compilatore TypeScript.  
- **`vite.config.ts`**: Configurazione per il build system Vite.  

---

### **SRC**

#### **Main Files**
- **`main.ts`**: Punto di ingresso dell'applicazione.  
- **`vite-env.d.ts`**: Tipizzazioni ambientali per Vite.  

#### **Form**
- **`form-scripts/form.ts` e `form-scripts/script.ts`**: Script per la gestione dei moduli.  
- **`form-styles/form.css`**: Stili specifici per i moduli.  

---

### **GLOBAL**

#### **Models**
- **`card-question.model.ts`**: Definisce l'interfaccia per le schede delle domande.  
- **`card-reservation.model.ts`**: Definisce l'interfaccia per le schede delle prenotazioni.  

#### **Scripts**
- **`generate-cards.ts`**: Script principale per generare schede.  
- **`cards`**: Contiene script per creare schede specifiche.  
- **`dialogs`**: Contiene script per la gestione delle finestre di dialogo.  
- **`navbar`**: Script per la gestione della barra di navigazione.  
- **`toasts`**: Script per notifiche toast.  

#### **Styles**
- **Global Styles**:  
  - `global.css`: Stili generali.  
  - `reset.css`: Reset per una base uniforme.  
- **Cards**: Stili per le schede di domande e prenotazioni.  
- **Dialogs**: Stili per le finestre di dialogo.  
- **Navbar**: Stili per la barra di navigazione.  
- **Toasts**: Stili per le notifiche toast.  

#### **Templates**
- **Cards**: Modelli HTML per le schede.  
- **Dialogs**: Modelli HTML per le finestre di dialogo.  
- **Toasts**: Modello HTML per notifiche toast.  

---

### **PAGES**

#### **Dashboard**
- **`index.html`**: Pagina principale del dashboard, viene mostrato un recap delle nuove domande (con stato non archiviato) e delle nuove prenotazioni (con stato "nuova" "accordare"), e la lista delle ultime 5 richieste mischiate in base alla data + recente.  
- **Script:**  
  - `get-latest-request.ts`: Recupera le ultime 5 richieste di domande e prenotazioni in ordine di data + recente.  
  - `new-requests.ts`: Gestisce le nuove richieste.  
  - `script.ts`: Script locale della dashboard che si collega agli script globali, al caricamento della pagina, vengono caricati i template necessari per essa, e le richieste di domande e prenotazioni.
- **Style:**  
  - `style.css`: Stile per la pagina della dashboard.  

#### **Questions**
- **`index.html`**: Pagina delle domande, vengono mostrate tutte le domande in ordine di data + recente.  
- **Script:**  
  - `script.ts`: Script locale della domande che si collega agli script globali, al caricamento della pagina, vengono caricati i template necessari per essa, e le richieste di domande.
- **Style:**  
  - `style.css`: Stile per la pagina delle domande.  

#### **Reservations**
- **`index.html`**: Pagina delle prenotazioni, vengono mostrate tutte le prenotazioni in ordine di data + recente.  
- **Script:**  
  - `script.ts`: Script locale della prenotazioni che si collega agli script globali, al caricamento della pagina, vengono caricati i template necessari per essa, e le richieste di prenotazione.
- **Style:**  
  - `style.css`: Stile per la pagina delle prenotazioni.  

#### **Settings**
- **`index.html`**: Pagina delle impostazioni, vengono mostrate i bottoni delle impostazioni per visualizzare le richiste di domande e prenotazioni archiviate, e la possibilità di cambiare la password.
- **Script:**  
  - `change-password.ts`: Cambia la password.  
  - `script.ts`: Funzionalità generali.  
- **Style:**  
  - `style.css`: Stili per la pagina delle impostazioni.  

---

### **Services**

API per gestire funzionalità principali legate allo [SWAGGER](http://localhost:8080/swagger-ui/index.html) 
- `login-auth.api.ts`: API per validare le credenziali admin, viene restiuto il TOKEN JWT per effettuare le altre operazioni API da inserire nell'autorizathion.  
- `archive-request.api.ts`: API per cambiare lo stato delle richieste in "archiviate" quando selezionata icona dell'archivio.  
- `delete-request.api.ts`: API per eleminare le richieste quando selezionata icona del cestino.  
- `get-requests.api.ts`: API per ottenere qualsiasi tipo di richieste (archiviate, tutte, non archiviate).  
- `update-password.api.ts`: API per aggiornare la password dell'utente.  
- `update-status-reservation.api.ts`: API per aggiornare lo stato delle prenotazioni che possiedono 3 fasi:
  - nuova
  - accordare
  - confermata  

---

### **Utilities**

- **`auth-guard.ts`**: Verifica i permessi di autenticazione prendendo il token, se non presente renderizza l'utente al login page.  
- **`load-templates.ts`**: Carica template HTML nelle pagine della backoffice, per gestire i vari pezzi di modali/dialoghi e template di carte per questions e reservations.  
- **`remove-icon.ts`**: Rimuove l'icona dell'archivio in caso siamo dentro l'archivio delle questions/reservations.  
- **`restructure-date.ts`**: Riformatta le date in formato GG/MM/YYYY (vengono gestite nell'applicazione con MM/GG/YYYY).  

---

## Integrated Tools

- **[Ionicons](https://ionic.io/ionicons)**: Libreria di icone.  

---
