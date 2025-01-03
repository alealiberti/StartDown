## Author Details

* Name: Gabriele Speciale
* Contact: gabriele.speciale@edu.itspiemonte.it





# Backoffice Structure description



## **SRC**


### **GLOBAL**

#### **Templates**
- **`card-question.ts`**: Defines the `cardQuestionTemplate`, a reusable HTML template string for rendering a question card component using TypeScript and `innerHTML`.
- **`card-reservation.ts`**: Defines the `cardReservationTemplate`, a reusable HTML template string for rendering a reservation card component using TypeScript and `innerHTML`.

#### **Scripts**
- **`expanded-navbar-phone.ts`**: Contains logic to expand the sidebar/navbar from a minimal view to full screen, specifically for phone devices.

#### **Styles**
- **`global.css`**:  
  Includes general style settings:
  - Sets `box-sizing` to `border-box` for better layout calculations.
  - Contains universal styles shared across all backoffice pages, including cards and text content.
  - Defines global variables in `:root`, such as background colors, fonts, and text colors used throughout the backoffice.
- **`reset.css`**: Resets browser styles to ensure consistent styling across all pages.
- **`navbar-phone.css`**: Styles for the expanded navbar/sidebar on phone devices.
- **`navbar-tablet-desktop.css`**: Styles for the sidebar/navbar on devices other than phones (e.g., tablets and desktops).
- **`card-question.css`**: Styles for the question card template located in the `templates/` folder, applied across pages displaying question cards.
- **`card-reservation.css`**: Styles for the reservation card template located in the `templates/` folder, applied across pages displaying reservation cards.

#### **Models**
- **`card-question.model.ts`**: Defines the interface type for question cards used in scripts.
- **`card-reservation.model.ts`**: Defines the interface type for reservation cards used in scripts.


## **PAGES**

### **Structure**
- **`index.html`**: Login form for the admin accessing the backoffice.
- **`src/pages/dashboard/index.html`**: Dashboard homepage of the backoffice which contains the latest questions/reservations requests cards.
- **`src/pages/questions/index.html`**: Page displaying questions.
- **`src/pages/reservations/index.html`**: Page displaying reservations.
- **`src/pages/settings/index.html`**: Page containing settings, such as theme customization and graphs for monthly reservations/questions.



---



## **Integrated Tools**

- **[Ionicons](https://ionic.io/ionicons)**:  
  A library of icons used across the backoffice pages for enhanced visual elements.



---



## **`vite.config.ts`**

### **Pages Structure**
- **`index.html`**: Login form.
- **`src/pages/dashboard/index.html`**: Home page of the backoffice.
- **`src/pages/questions/index.html`**: Page displaying user-submitted questions.
- **`src/pages/reservations/index.html`**: Page displaying reservations.
- **`src/pages/settings/index.html`**: Settings page featuring customization options, such as theme changes and graphs for tracking monthly reservations/questions.