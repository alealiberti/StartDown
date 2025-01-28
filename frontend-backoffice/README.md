# Cascina Caccia Backoffice

## Author Details

- **Name:** Speciale Gabriele  
- **Contact:** gabriele.speciale@edu.itspiemonte.it  

---

## Project Overview

This application is a backoffice system designed to manage requests, reservations, and settings through a user-friendly interface. Developed with **TypeScript**, **HTML**, **CSS**, and configured using **Vite**.

---

## Directory Structure

### Root Files

- **`.gitignore`**: Specifies files and directories to exclude from Git version control.  
- **`index.html`**: Main login page to access the backoffice.  
- **`package.json` & `package-lock.json`**: Node.js configuration files that specify dependencies and scripts.  
- **`README.md`**: Project description.  
- **`tsconfig.json`**: Configuration for the TypeScript compiler.  
- **`vite.config.ts`**: Configuration for the Vite build system.  

---

## SRC

- **`vite-env.d.ts`**: Environmental typings for Vite.  

### **FORM**
- **`form-scripts`**:  
  - `script.ts`: Local script for the form used to load necessary templates for the form (e.g., toast notifications).  
  - `form.ts`: Script to perform the POST API login, receiving the JWT TOKEN, which allows other API calls within the backoffice by adding it to the API authorization headers.  
- **`form-styles`**:  
  - `form.css`: Styles for the form.  
- **`main.ts`**: Entry point for the form root page, containing global and local imports for scripts and styles.  

---

### **GLOBAL**

#### **Models**
- **`card-question.model.ts`**: Defines the interface for question objects (properties match the backend).  
- **`card-reservation.model.ts`**: Defines the interface for reservation objects (properties match the backend).  

#### **Scripts**
- **`cards`**: Contains scripts to create specific cards.  
  - `generate-cards.ts`: Script that retrieves requests to display from local page scripts. It also contains functions to create both question and reservation cards and handles click events for opening dialogs and modals.  
  - `create-card-question.ts`: Script to create question cards by dynamically populating the HTML fields with question data.  
  - `create-card-reservation.ts`: Script to create reservation cards by dynamically populating the HTML fields with reservation data.  
- **`dialogs`**: Contains scripts for managing dialog windows.  
  - `open-dialog.ts`: Script to manage the opening of dialogs and modals, such as request creation modals, delete modals, and archive modals.  
  - `close-dialog.ts`: Script to manage the closing of dialogs and modals and removing them from the DOM, including overlay closure.  
  - `dialog-card-question.ts`: Script to create a dialog for a question, showing all its details.  
  - `dialog-card-reservation.ts`: Script to create a dialog for a reservation, showing all its details.  
  - `dialog-delete.ts`: Script to create a delete dialog when the trash icon is clicked on a request card or its expanded modal.  
  - `dialog-archive.ts`: Script to create an archive dialog when the archive icon is clicked on a request card or its expanded modal.  
- **`navbar`**: Script to manage the navigation bar.  
  - `navbar.ts`: Script to attach events to navigation bar elements, such as expanding and collapsing the menu on mobile devices and logging out by removing the JWT token from localStorage.  
- **`toasts`**: Script for toast notifications.  
  - `toast-notification.ts`: Script to create toast notifications when API requests are performed (e.g., login, password change, reservation update).  

#### **Styles**
- **Global Styles**:  
  - `global.css`: General styles.  
  - `reset.css`: Reset styles for a consistent base.  
- **Cards**: Styles for question and reservation cards.  
  - `card-question.css`: Styles for question cards.  
  - `card-reservation.css`: Styles for reservation cards.  
- **Dialogs**: Styles for dialog windows.  
  - `overlay-dialog.css`: Styles for the overlay that appears when a dialog is opened.  
  - `dialog-card-question.css`: Styles for question dialogs when expanded.  
  - `dialog-card-reservation.css`: Styles for reservation dialogs when expanded.  
  - `dialog-actions.css`: Styles for action dialogs like delete and archive when their icons are clicked.  
- **Navbar**: Styles for the navigation bar.  
  - `navbar.css`: Styles for the mobile-only navigation bar.  
- **Toasts**: Styles for toast notifications.  
  - `toast-notification.css`: Styles for toast notifications shown at the top-right corner during API requests.  

#### **Templates**
- **Cards**: HTML templates for cards.  
  - `card-question.html`: HTML template for question cards.  
  - `card-reservation.html`: HTML template for reservation cards.  
- **Dialogs**: HTML templates for dialog windows.  
  - `dialog-card-question.html`: HTML template for question dialogs when expanded.  
  - `dialog-card-reservation.html`: HTML template for reservation dialogs when expanded.  
  - `dialog-delete.html`: HTML template for delete dialogs when the trash icon is clicked.  
  - `dialog-archive.html`: HTML template for archive dialogs when the archive icon is clicked.  
  - `dialog-password.html`: HTML template for password change dialogs from the settings page.  
- **Toasts**: HTML template for toast notifications.  
  - `toast-notification.html`: HTML template for toast notifications shown at the top-right corner during API requests.  

---

### **PAGES**

#### **Dashboard**
- **`index.html`**: Main dashboard page showing a recap of new questions (non-archived) and new reservations (status: "new" or "to agree"), along with a list of the latest 5 mixed requests by the most recent date.  
- **Scripts:**  
  - `get-latest-request.ts`: Retrieves the latest 5 requests (questions and reservations) ordered by the most recent date.  
  - `new-requests.ts`: Fills the top boxes on the dashboard page, incrementing counts based on specific parameters:  
    - *Questions*: New questions are those that are not archived.  
    - *Reservations*: New reservations are those with the status "new"/"to agree" and not archived.  
  - `script.ts`: Local dashboard script that connects to global scripts. On page load, it loads necessary templates and processes question and reservation requests.  
- **Styles:**  
  - `style.css`: Styles for the dashboard page.  
- **`main.ts`**: Entry point for the dashboard page, containing global and local imports for scripts and styles used to dynamically create the page.  

#### **Questions**
- **`index.html`**: Page for displaying all questions, ordered by the most recent date.  
- **Scripts:**  
  - `script.ts`: Local script for the questions page that connects to global scripts. On page load, it loads necessary templates and processes question requests.  
- **Styles:**  
  - `style.css`: Styles for the questions page.  
- **`main.ts`**: Entry point for the questions page, containing global and local imports for scripts and styles used to dynamically create the page.  

#### **Reservations**
- **`index.html`**: Page for displaying all reservations, ordered by the most recent date.  
- **Scripts:**  
  - `script.ts`: Local script for the reservations page that connects to global scripts. On page load, it loads necessary templates and processes reservation requests.  
- **Styles:**  
  - `style.css`: Styles for the reservations page.  
- **`main.ts`**: Entry point for the reservations page, containing global and local imports for scripts and styles used to dynamically create the page.  

#### **Settings**
- **`index.html`**: Page for settings, displaying buttons to view archived questions and reservations and the option to change the password.  
- **Scripts:** 
  - `create-header.ts`: Script to create the header for the settings page when the archived questions and reservations buttons are clicked (generate the specif header).
  - `change-password.ts`: Script to perform a PUT API call for changing the admin password, including validations for the old and new passwords from the backend.  
  - `script.ts`: Local script for the settings page that connects to global scripts. On page load, it loads necessary templates and processes settings requests.  
- **Styles:**  
  - `style.css`: Styles for the settings page.  
  - `dialog-password.css`: Styles for the password change dialog.  
- **`main.ts`**: Entry point for the settings page, containing global and local imports for scripts and styles used to dynamically create the page.  

---

### **Services**

APIs for managing core functionalities, linked to [SWAGGER](http://localhost:8080/swagger-ui/index.html):  
- `login-auth.api.ts`: API to validate admin credentials, returning a JWT TOKEN for authorization in other API operations.  
- `archive-request.api.ts`: API to mark requests as "archived" when the archive icon is selected.  
- `delete-request.api.ts`: API to delete requests when the trash icon is selected.  
- `get-requests.api.ts`: API to fetch all types of requests (archived, all, non-archived).  
- `update-password.api.ts`: API to update the user password.  
- `update-status-reservation.api.ts`: API to update the status of reservations, which have three phases:  
  - New  
  - To Agree  
  - Confirmed  

---

### **Utilities**

- **`auth-guard.ts`**: Verifies authentication permissions by checking for the token. If not present, it redirects the user to the login page.  
- **`load-templates.ts`**: Loads HTML templates into backoffice pages to manage modal/dialog pieces and card templates for questions and reservations.  
- **`remove-icon.ts`**: Removes the archive icon when viewing the archive for questions or reservations.  
- **`restructure-date.ts`**: Reformats dates into the format DD/MM/YYYY (managed as MM/DD/YYYY in the application).  

---

## Integrated Tools

- **[Ionicons](https://ionic.io/ionicons)**: Icon library.  
- **[Vite](https://vitejs.dev/)**: Lightweight and fast build tool for web applications.  